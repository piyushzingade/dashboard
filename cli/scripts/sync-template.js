const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const sourceDir = path.resolve(__dirname, '../../');
const targetDir = path.resolve(__dirname, '../template');
const cliDir = path.resolve(__dirname, '../');

const excludeDirs = [
    'node_modules',
    '.next',
    '.git',
    'dist',
    'build'
];

const excludeFiles = [
    '.env',
    '.env.local',
    '.env.example',
    'bun.lock',
    'package-lock.json',
    'yarn.lock'
];

const AUTH_RELATED_FILES = [
    'lib/auth.ts',
    'lib/db.ts',
    'prisma',
    'app/api/auth',
    'app/api/verify-captcha',
    'app/signin',
    'components/providers/session-provider.tsx'
];

async function copyRecursive(src, dest, excludeAuthFiles = false) {
    try {
        const stats = await fs.stat(src);

        if (stats.isDirectory()) {
            // Skip the CLI directory itself to avoid infinite recursion/copying into self
            if (src === cliDir) return;

            const basename = path.basename(src);
            if (excludeDirs.includes(basename)) return;

            // Check if this directory should be excluded for non-auth template
            if (excludeAuthFiles) {
                const relativePath = path.relative(sourceDir, src);
                if (AUTH_RELATED_FILES.some(f => relativePath === f || relativePath.startsWith(f + path.sep))) {
                    return;
                }
            }

            await fs.ensureDir(dest);
            const files = await fs.readdir(src);

            for (const file of files) {
                await copyRecursive(path.join(src, file), path.join(dest, file), excludeAuthFiles);
            }
        } else {
            const basename = path.basename(src);
            if (excludeFiles.includes(basename)) return;

            // Check if this file should be excluded for non-auth template
            if (excludeAuthFiles) {
                const relativePath = path.relative(sourceDir, src);
                if (AUTH_RELATED_FILES.some(f => relativePath === f || relativePath.startsWith(f))) {
                    return;
                }
            }

            // Rename .gitignore to _gitignore
            if (basename === '.gitignore') {
                await fs.copy(src, path.join(path.dirname(dest), '_gitignore'));
            } else {
                await fs.copy(src, dest);
            }
        }
    } catch (error) {
        console.error(chalk.red(`Error copying ${src}:`), error);
    }
}

async function removeAuthDependencies(templateDir) {
    // 1. Modify app/layout.tsx
    const layoutPath = path.join(templateDir, 'app/layout.tsx');
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
    const packageJsonPath = path.join(templateDir, 'package.json');
    if (await fs.pathExists(packageJsonPath)) {
        const packageJson = await fs.readJson(packageJsonPath);
        delete packageJson.dependencies['next-auth'];
        delete packageJson.dependencies['@auth/prisma-adapter'];
        delete packageJson.dependencies['@prisma/client'];
        delete packageJson.dependencies['prisma'];
        delete packageJson.dependencies['react-turnstile'];
        delete packageJson.dependencies['@marsidev/react-turnstile'];

        // Remove prisma generate from build script
        if (packageJson.scripts && packageJson.scripts.build) {
            packageJson.scripts.build = packageJson.scripts.build.replace(/npx prisma generate &&\s*/g, '');
            packageJson.scripts.build = packageJson.scripts.build.replace(/npx prisma generate\s*&&/g, '');
        }

        await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    }


    // 3. Modify components/layout/app-sidebar.tsx - completely rewrite the footer section
    const sidebarPath = path.join(templateDir, 'components/layout/app-sidebar.tsx');
    if (await fs.pathExists(sidebarPath)) {
        let content = await fs.readFile(sidebarPath, 'utf8');

        // Remove auth imports
        content = content.replace(new RegExp("import { useSession, signOut } from ['\"]next-auth/react['\"];\\n", 'g'), '');
        content = content.replace(new RegExp("import { signOut, useSession } from ['\"]next-auth/react['\"];\\n", 'g'), '');
        content = content.replace(new RegExp('const { data: session } = useSession\\(\\);\\n', 'g'), '');

        // Replace the entire SidebarFooter section with a simple placeholder
        const footerRegex = /<SidebarFooter>[\s\S]*?<\/SidebarFooter>/;
        const newFooter = `<SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="px-2 py-2 text-sm text-muted-foreground">
                            Dashboard User
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>`;
        content = content.replace(footerRegex, newFooter);

        await fs.writeFile(sidebarPath, content);
    }

    // 4. Modify app/page.tsx - remove auth check and just redirect to dashboard
    const appPagePath = path.join(templateDir, 'app/page.tsx');
    if (await fs.pathExists(appPagePath)) {
        const newContent = `import { redirect } from "next/navigation";

export default async function Home() {
  return redirect("/dashboard");
}
`;
        await fs.writeFile(appPagePath, newContent);
    }

    // 5. Modify app/dashboard/page.tsx - remove auth check
    const dashboardPagePath = path.join(templateDir, 'app/dashboard/page.tsx');
    if (await fs.pathExists(dashboardPagePath)) {
        const newContent = `import { redirect } from 'next/navigation';

export default async function Dashboard() {
    redirect('/dashboard/overview');
}
`;
        await fs.writeFile(dashboardPagePath, newContent);
    }

    // 6. Modify app/dashboard/layout.tsx - remove auth check
    const dashboardLayoutPath = path.join(templateDir, 'app/dashboard/layout.tsx');
    if (await fs.pathExists(dashboardLayoutPath)) {
        let content = await fs.readFile(dashboardLayoutPath, 'utf8');
        content = content.replace(new RegExp('import { authOptions } from "@/lib/auth";\\n', 'g'), '');
        content = content.replace(new RegExp("import { authOptions } from '@/lib/auth';\\n", 'g'), '');
        content = content.replace(new RegExp('import { getServerSession } from "next-auth";\\n', 'g'), '');
        content = content.replace(new RegExp("import { getServerSession } from 'next-auth';\\n", 'g'), '');
        content = content.replace(new RegExp('const session = await getServerSession\\(authOptions\\);\\n', 'g'), '');
        content = content.replace(new RegExp('\\n\\s*if \\(!session\\) {\\n\\s*redirect\\("/signin"\\);\\n\\s*}\\n', 'g'), '\n');
        content = content.replace(new RegExp('import { redirect } from "next/navigation";\\n', 'g'), '');
        content = content.replace(new RegExp("import { redirect } from 'next/navigation';\\n", 'g'), '');
        await fs.writeFile(dashboardLayoutPath, content);
    }
}

async function sync() {
    console.log(chalk.blue('Syncing template...'));

    try {
        // Generate single template (complete copy with auth)
        console.log(chalk.cyan('\n📦 Generating template...'));
        await fs.emptyDir(targetDir);
        await copyRecursive(sourceDir, targetDir, false);
        console.log(chalk.green('✓ Template generated successfully!'));

        console.log(chalk.green.bold('\n✨ Template synced successfully!'));
    } catch (error) {
        console.error(chalk.red('Error syncing template:'), error);
    }
}

sync();
