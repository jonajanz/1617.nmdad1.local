/*
ApplicationDbContext
--------------------
1) Database transactions to the database --> localstorage
2) Cache
*/

var ApplicationDbContext = {
    "init": function(strConnection) {
        this._strConnection = strConnection; // Connection string to the key in the localstorage
        this._dbData = {
            "info": {
                "title": "Lecturerama",
                "description": "App for students: See if a lecturer is present",
                "version": "1.0.",
                "modified": "2016-11-17",
                "author": "AHS - GDM - MMP"
            },
            "lecturers": [],
            "timetable": [],
            "settings": []
        }; // JSON-string: The data as value of the previous connection string (key in the localstorage)
        // Save the data in the localstorage. First check if the data is present in the database. If present -> GET THE DATA. If not --> SAVE _dbData in the database
        if(Utils.store(this._strConnection) != null) {
            this._dbData = Utils.store(this._strConnection);
        } else {
            Utils.store(this._strConnection, this._dbData);
        }
    },
    "getLecturers": function() {
        // Get all lecturers
    },
    "getLecturerById": function(id) {
        // Get lecturer by id
    },
    "addLecturer": function(lecturer) {
        // Add a new lecturer (CREATE -> DB INSERT)
    },
    "updateLecturer": function(lecturer) {
        // Update an existing lecturer (UPDATE -> DB UPDATE)
    },
    "deleteLecturer": function(id) {
        // Delete an existing lecturer (DELETE -> DB DELETE)
    },
    "softDeleteLecturer": function(id) {
        // Soft Delete an existing lecturer (UPDATE -> DB UPDATE)
        // Field: DeletedAt = Snapshot in time
    },
    "softUndeleteLecturer": function(id) {
        // Soft UnDelete an existing lecturer (UPDATE -> DB UPDATE)
        // Field: DeletedAt = null
    },
    "save": function() {
        // Save _dbData into the database (localstorage)
        Utils.store(this._strConnection, this._dbData);
        return true;
    },
    "findLecturerIndexById": function(id) {
        // Find the index of the lecturer by id
    }
};