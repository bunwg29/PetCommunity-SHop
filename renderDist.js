import fs from "fs-extra";

const listFolderCopy = [
    {
        sourceDirectory: "views",
        targetDirectory: "dist/views"
    },
    {
        sourceDirectory: "public",
        targetDirectory: "dist/public"
    }
];

listFolderCopy.forEach(item => {
    fs.copy(item.sourceDirectory, item.targetDirectory)
});