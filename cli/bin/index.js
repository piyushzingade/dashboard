#!/usr/bin/env node

const { Command } = require('commander');
const prompts = require('prompts');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');

const program = new Command();

const AUTH_RELATED_FILES = [
    'lib/auth.ts',
    'lib/db.ts',
    'prisma',
    'app/api/auth',
    'app/api/verify-captcha',
    'app/signin',
    'components/providers/session-provider.tsx'
];

async function copyRecursive(src, dest, includeAuth) {
    const stats = await fs.stat(src);
    const isDirectory = stats.isDirectory();

    if (isDirectory) {
        await fs.ensureDir(dest);
        const children = await fs.readdir(src);
        for (const child of children) {
            await copyRecursive(path.join(src, child), path.join(dest, child), includeAuth);
        }
    } else {
        // Check if file should be excluded based on auth selection
        const relativePath = path.relative(path.resolve(__dirname, '../template'), src);
        if (!includeAuth && AUTH_RELATED_FILES.some(f => relativePath.startsWith(f))) {
            return;
        }

        if (await fs.pathExists(dest)) {
            const response = await prompts({
                type: 'confirm',
                name: 'overwrite',
                message: `File ${path.basename(dest)} already exists. Overwrite?`,
                initial: false
            });
            if (!response.overwrite) {
                console.log(chalk.yellow(`Skipping ${path.basename(dest)}`));
                return;
            }
        }
        await fs.copy(src, dest);
    }
}

async function removeAuthDependencies(projectDir) {
    // 1. Modify app/layout.tsx
    const layoutPath = path.join(projectDir, 'app/layout.tsx');
    if (await fs.pathExists(layoutPath)) {
        let content = await fs.readFile(layoutPath, 'utf8');
        content = content.replace(new RegExp('import AuthProvider from "@/components/providers/session-provider";\\n', 'g'), '');
        content = content.replace(new RegExp('import { getServerSession } from "next-auth";\\n', 'g'), '');
        content = content.replace(new RegExp('import { authOptions } from "@/lib/auth";\\n', 'g'), '');
        content = content.replace(new RegExp('const session = await getServerSession\\(authOptions\\);\\n', 'g'), '');
        content = content.replace(new RegExp('<AuthProvider session={session}>\\n', 'g'), '');
        content = content.replace(new RegExp('</AuthProvider>\\n', 'g'), '');
        await fs.writeFile(layoutPath, content);
    }

    // 2. Modify package.json
    const packageJsonPath = path.join(projectDir, 'package.json');
    if (await fs.pathExists(packageJsonPath)) {
        const packageJson = await fs.readJson(packageJsonPath);
        delete packageJson.dependencies['next-auth'];
        delete packageJson.dependencies['@auth/prisma-adapter'];
        delete packageJson.dependencies['@prisma/client'];
        delete packageJson.dependencies['prisma'];
        delete packageJson.dependencies['react-turnstile'];
        delete packageJson.dependencies['@marsidev/react-turnstile'];
        await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    }

    // 3. Modify components/layout/app-sidebar.tsx
    const sidebarPath = path.join(projectDir, 'components/layout/app-sidebar.tsx');
    if (await fs.pathExists(sidebarPath)) {
        let content = await fs.readFile(sidebarPath, 'utf8');

        content = content.replace(new RegExp('import { useSession, signOut } from "next-auth/react";\\n', 'g'), '');
        content = content.replace(new RegExp('const { data: session } = useSession\\(\\);\\n', 'g'), '');

        content = content.replace(new RegExp('session\\?.user', 'g'), 'null');
        content = content.replace(new RegExp('session\\.user', 'g'), 'null');

        content = content.replace(new RegExp("onClick={\\(\\) => signOut\\({ callbackUrl: '/signin' }\\)}", 'g'), '');

        await fs.writeFile(sidebarPath, content);
    }
}

program
    .name('nexui-dashboard-cli')
    .description('CLI to scaffold the NexUI Dashboard')
    .version('1.0.0')
    .argument('[project-directory]', 'Directory to create the project in')
    .action(async (projectDirectory) => {
        let targetDir = projectDirectory;

        if (!targetDir) {
            const response = await prompts({
                type: 'text',
                name: 'value',
                message: 'What is the name of your project?',
                initial: 'my-dashboard'
            });

            if (!response.value) {
                console.log(chalk.red('Operation cancelled'));
                process.exit(1);
            }
            targetDir = response.value;
        }

        const fullPath = path.resolve(process.cwd(), targetDir);
        const templateDir = path.resolve(__dirname, '../template');

        // Auth Prompt
        const authResponse = await prompts({
            type: 'confirm',
            name: 'includeAuth',
            message: 'Do you want to include authentication? (NextAuth + Prisma)',
            initial: true
        });

        if (authResponse.includeAuth === undefined) {
            console.log(chalk.red('Operation cancelled'));
            process.exit(1);
        }

        const includeAuth = authResponse.includeAuth;

        const spinner = ora('Scaffolding project...').start();

        try {
            // Ensure target directory exists
            await fs.ensureDir(fullPath);

            // Recursive copy with checks
            await copyRecursive(templateDir, fullPath, includeAuth);

            // Rename _gitignore to .gitignore
            const gitignorePath = path.join(fullPath, '_gitignore');
            if (await fs.pathExists(gitignorePath)) {
                const realGitignorePath = path.join(fullPath, '.gitignore');
                if (await fs.pathExists(realGitignorePath)) {
                    // Ask to overwrite .gitignore? Or just skip?
                    // For simplicity, let's skip if exists, or maybe we already handled it in copyRecursive?
                    // _gitignore is copied as _gitignore. We need to rename it.
                    // If .gitignore exists, we should probably ask.
                    // But copyRecursive already ran.
                    // Let's just move it if .gitignore doesn't exist.
                    await fs.move(gitignorePath, realGitignorePath, { overwrite: false });
                    // If move failed (dest exists), remove _gitignore
                    if (await fs.pathExists(gitignorePath)) {
                        await fs.remove(gitignorePath);
                    }
                } else {
                    await fs.move(gitignorePath, realGitignorePath);
                }
            }

            if (!includeAuth) {
                spinner.text = 'Removing authentication dependencies...';
                await removeAuthDependencies(fullPath);
            }

            // Create README.md if it doesn't exist, or append instructions
            const readmePath = path.join(fullPath, 'README.md');
            const readmeContent = `
# ${path.basename(targetDir)}

This project was scaffolded with NexUI Dashboard CLI.

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   # or
   bun install
   \`\`\`

2. Run the development server:
   \`\`\`bash
   npm run dev
   # or
   bun run dev
   \`\`\`

${includeAuth ? `
## Authentication

This project uses NextAuth.js and Prisma.
Make sure to set up your environment variables in \`.env\`.
` : ''}
`;
            if (!await fs.pathExists(readmePath)) {
                await fs.writeFile(readmePath, readmeContent);
            } else {
                // Maybe append? Or leave it alone as copyRecursive handled it.
                // If copyRecursive handled it, we might have overwritten it or skipped it.
                // If we skipped it, we might want to show these instructions in console.
            }

            spinner.succeed(chalk.green(`Project created successfully in ${targetDir}!`));

            console.log('\nNext steps:');
            console.log(chalk.cyan(`  cd ${targetDir}`));
            console.log(chalk.cyan('  npm install'));
            console.log(chalk.cyan('  npm run dev'));
        } catch (error) {
            spinner.fail(chalk.red('Failed to create project'));
            console.error(error);
            process.exit(1);
        }
    });

program.parse(process.argv);
