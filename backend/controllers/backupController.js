import {
    listBackups,
    restoreBackup,
    deleteBackup,
    createBackup
} from "../services/backupService.js";
export function create(req, res) {
    try {

        const file = createBackup();

        res.json({
            success: true,
            message: "Backup created successfully.",
            file
        });

    } catch (err) {

        res.status(400).json({
            success: false,
            message: err.message
        });

    }
}

export function removeBackup(req, res) {
    try {

        deleteBackup(req.body.filename);

        res.json({
            success: true,
            message: "Backup deleted successfully."
        });

    } catch (err) {

        res.status(400).json({
            success: false,
            message: err.message
        });

    }
}

export function getBackups(req, res) {

    res.json({
        success: true,
        backups: listBackups()
    });

}

export function restore(req, res) {

    try {

        restoreBackup(req.body.filename);

        res.json({
            success: true,
            message: "Backup restored successfully."
        });

    }

    catch(err){

        res.status(400).json({
            success:false,
            message:err.message
        });

    }

}