import { listBackups, restoreBackup } from "../services/backupService.js";

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