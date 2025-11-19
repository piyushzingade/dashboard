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

async function copyRecursive(src, dest) {
    try {
        const stats = await fs.stat(src);

        if (stats.isDirectory()) {
            // Skip the CLI directory itself to avoid infinite recursion/copying into self
            if (src === cliDir) return;

            const basename = path.basename(src);
            if (excludeDirs.includes(basename)) return;

            await fs.ensureDir(dest);
            const files = await fs.readdir(src);

            for (const file of files) {
                await copyRecursive(path.join(src, file), path.join(dest, file));
            }
        } else {
            const basename = path.basename(src);
            if (excludeFiles.includes(basename)) return;

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

async function sync() {
    console.log(chalk.blue('Syncing template...'));

    try {
        // Ensure target directory is empty
        await fs.emptyDir(targetDir);

        // Start recursive copy
        await copyRecursive(sourceDir, targetDir);

        console.log(chalk.green('Template synced successfully!'));
    } catch (error) {
        console.error(chalk.red('Error syncing template:'), error);
    }
}

sync();
