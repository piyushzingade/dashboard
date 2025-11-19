#!/usr/bin/env node

const { Command } = require('commander');
const prompts = require('prompts');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');

const program = new Command();


async function isDirectoryEmpty(dirPath) {
    try {
        const files = await fs.readdir(dirPath);
        // Ignore .git and hidden files for the check
        const visibleFiles = files.filter(f => !f.startsWith('.'));
        return visibleFiles.length === 0;
    } catch (error) {
        // Directory doesn't exist, so it's "empty"
        return true;
    }
}

async function copyRecursive(src, dest, overwrite = false) {
    const stats = await fs.stat(src);
    const isDirectory = stats.isDirectory();

    if (isDirectory) {
        await fs.ensureDir(dest);
        const children = await fs.readdir(src);
        for (const child of children) {
            await copyRecursive(path.join(src, child), path.join(dest, child), overwrite);
        }
    } else {
        // Skip if file exists and overwrite is false
        if (await fs.pathExists(dest) && !overwrite) {
            return;
        }
        await fs.copy(src, dest);
    }
}

program
    .name('nexui-dashboard-cli')
    .description('CLI to scaffold the NexUI Dashboard')
    .version('1.0.0')
    .argument('[project-directory]', 'Directory to create the project in')
    .action(async (projectDirectory) => {
        console.log(chalk.bold.cyan('\n🚀 Welcome to NexUI Dashboard CLI!\n'));

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
        const templateDir = path.resolve(__dirname, '..', 'template');

        // Check if template exists
        if (!await fs.pathExists(templateDir)) {
            console.log(chalk.red(`\nError: Template directory not found`));
            console.log(chalk.yellow('Please run "npm run sync" in the cli directory to generate template.\n'));
            process.exit(1);
        }

        const spinner = ora('Checking for existing files...').start();

        try {
            // Ensure target directory exists
            await fs.ensureDir(fullPath);

            // Check if directory is empty or has existing files
            const isEmpty = await isDirectoryEmpty(fullPath);

            let shouldOverwrite = false;

            if (!isEmpty) {
                spinner.stop();
                console.log(chalk.yellow(`\n⚠️  The directory '${targetDir}' is not empty and contains existing files.`));

                const response = await prompts({
                    type: 'confirm',
                    name: 'overwrite',
                    message: 'Do you want to overwrite existing files?',
                    initial: false
                });

                if (!response.overwrite) {
                    console.log(chalk.red('\n❌ Sorry, there are conflicts with existing files.'));
                    console.log(chalk.yellow('Project creation aborted.\n'));
                    process.exit(0);
                }

                shouldOverwrite = true;
                spinner.start('Scaffolding project...');
            } else {
                spinner.text = 'Scaffolding project...';
            }

            // Copy from template with overwrite setting
            await copyRecursive(templateDir, fullPath, shouldOverwrite);

            // Rename _gitignore to .gitignore
            const gitignorePath = path.join(fullPath, '_gitignore');
            if (await fs.pathExists(gitignorePath)) {
                const realGitignorePath = path.join(fullPath, '.gitignore');

                if (await fs.pathExists(realGitignorePath)) {
                    if (shouldOverwrite) {
                        // Overwrite existing .gitignore
                        await fs.move(gitignorePath, realGitignorePath, { overwrite: true });
                    } else {
                        // Keep existing .gitignore, remove the temp one
                        await fs.remove(gitignorePath);
                    }
                } else {
                    // No .gitignore exists, just rename
                    await fs.move(gitignorePath, realGitignorePath);
                }
            }

            // Create README.md if it doesn't exist
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

2. Set up environment variables:
   \`\`\`bash
   cp .env.example .env
   # Edit .env with your database credentials
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run dev
   # or
   bun run dev
   \`\`\`

## Authentication

This project uses NextAuth.js and Prisma.
Make sure to set up your environment variables in \`.env\`.
`;
            if (!await fs.pathExists(readmePath)) {
                await fs.writeFile(readmePath, readmeContent);
            }

            spinner.succeed(chalk.green(`Project created successfully in ${targetDir}!`));

            console.log('\n' + chalk.bold('Next steps:'));
            console.log(chalk.cyan(`  cd ${targetDir}`));
            console.log(chalk.cyan('  npm or pnpm or yarn or bun install'));
            console.log(chalk.cyan('  cp .env.example .env'));
            console.log(chalk.cyan('  npm run dev'));
            console.log('\n' + chalk.yellow('📝 Note: Don\'t forget to set up your .env file with database credentials and migrate the database and come to us with hate!'));
            console.log('');
        } catch (error) {
            spinner.fail(chalk.red('Failed to create project'));
            console.error(error);
            process.exit(1);
        }
    });

program.parse(process.argv);
