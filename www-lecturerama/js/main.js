function ready(cb) {
    /in/.test(document.readyState)
    ? setTimeout(ready.bind(null, cb), 90)
    : cb();
};

ready(function(){

    var App = {
        "init": function() {
            this._unitTesting = false; // Unit Testing the features in ApplicationDbContext or not

            this.URLRANDOMUSERME = 'http://api.randomuser.me/?results=200&callback=json_callback';// Cache the url with random users in variable URLRANDOMUSERME

            this._applicationDbContext = ApplicationDbContext; // Reference to the ApplicationDbContext object
            this._applicationDbContext.init('ahs.gdm.mmp.lecturerama'); // Initialize the ApplicationDbContext object via the methode init. Do not forget the connection string as a parametervalue of this function

            this._myGUID = '9bdc9e9e-4eea-46e6-99fe-98427224667e'; // Just for emulating the logged in user

            if(this._unitTesting || this._applicationDbContext.getLecturers() == null) {
                this.unitTests();
            }

            this.updateUI();
        },
        "updateUI": function() {
            if(this._applicationDbContext.getLecturers() != null) {
                var tempStr = '';
                var ch = window.innerHeight - 110;
                
                var lecturers = this._applicationDbContext.getLecturers(), lecturer = null;
                for(var i=0;i<lecturers.length;i++) {
                    var lecturer = lecturers[i];
                    tempStr += '<div class="lecturer" data-id="' + lecturer.Id + '">';
                    tempStr += '<div class="lecturer__meta">' + '<span class="lecturer__gender">' + Genders.properties[lecturer.Gender].name + '</span>' + '<span class="lecturer__age">' + Utils.getAge(new Date(lecturer.DayOfBirth)) + '</span>' + '</div>';
                    tempStr += '<picture class="lecturer__picture">';
                    tempStr += '<img src="' + lecturer.Picture + '" />';
                    tempStr += '</picture>';
                    tempStr += '<h3 class="lecturer__name">' + lecturer.FirstName + ' ' + lecturer.SurName + '</h3>';
                    tempStr += '<div class="lecturer__actions">';
                    tempStr += '<span class="material-icons like" data-id="' + lecturer.Id + '" data-tinderize="1">&#xE87D;</span>';
                    tempStr += '<span class="material-icons dislike" data-id="' + lecturer.Id + '" data-tinderize="2">&#xE043;</span>';
                    tempStr += '</div>';
                    tempStr += '</div>';
                };

                document.querySelector('.list-lecturers').innerHTML = tempStr;

                // Register EventListeners for all like and dislike buttons
                this.registerLecturerEventListeners();
            }
        },
        "registerLecturerEventListeners": function() {
            var self = this;

            var lecturerElements = document.querySelectorAll('.lecturer');
            if(lecturerElements != null && lecturerElements.length > 0) {
                var lecturerElement = null;
                for(var i=0;i<lecturerElements.length;i++) {
                    lecturerElement = lecturerElements[i];
                    lecturerElement.querySelector('.like').addEventListener('click', function(ev) {
                        self.addTinderizeLecturer(this.dataset.id, this.dataset.tinderize);
                    });
                    lecturerElement.querySelector('.dislike').addEventListener('click', function(ev) {
                        self.addTinderizeLecturer(this.dataset.id, this.dataset.tinderize);
                    });
                }
            }
        },
        "addTinderizeLecturer": function(lecturerId, tinderize) {
            var tinderizeLecturer = new TinderizeLecturer();
            tinderizeLecturer.UserId = this._myGUID;
            tinderizeLecturer.LecturerId = lecturerId;
            var tinderizeLecturerAdded = this._applicationDbContext.addTinderizeLecturer(tinderizeLecturer);
            console.log(tinderizeLecturerAdded);
        },
        "unitTests": function() {

            var self = this; // Closure

            //Unit Testing the Lecturers
            if(this._applicationDbContext.getLecturers() == null) {

                // Load JSON from corresponding RandomUserMe API with certain URL
                Utils.getJSONPByPromise(this.URLRANDOMUSERME).then(
                    function(data) {
                        var users = data.results, lecturer = null, user = null;
                        for(var i=0;i<users.length;i++) {
                            user = users[i];
                            lecturer = new Lecturer();
                            lecturer.FirstName = user.name.first;
                            lecturer.SurName = user.name.last;
                            lecturer.DayOfBirth = new Date(user.dob);
                            lecturer.Email = user.email;
                            lecturer.Picture = user.picture.large;
                            switch(user.gender) {
                                case 'male': lecturer.Gender = Genders.MALE;break;
                                case 'female': lecturer.Gender = Genders.FEMALE;break;
                                default: lecturer.Gender = Genders.NOTKNOWN;break;
                            }
                            var lecturerAdded = self._applicationDbContext.addLecturer(lecturer);
                            console.log(lecturerAdded);

                            self.updateUI();
                        }
                    },
                    function(status) {
                        console.log(status);
                    }
                );

            } else {
                // Update a lecturer
                var id = this._applicationDbContext.getLecturers()[0].Id;
                var lecturer = this._applicationDbContext.getLecturerById(id);
                if(lecturer != null) {
                    lecturer.FirstName = 'Olivia';
                    var result = this._applicationDbContext.updateLecturer(lecturer);
                    console.log(result);
                }

                // Soft delete or undelete a lecturer
                lecturer = this._applicationDbContext.getLecturerById(id);
                if(lecturer != null) {
                    var result = (lecturer.DeletedAt == null || lecturer.DeletedAt == undefined)?this._applicationDbContext.softDeleteLecturer(lecturer.Id):this._applicationDbContext.softUnDeleteLecturer(lecturer.Id);
                    console.log(result);
                }

                // Delete a lecturer
                lecturer = this._applicationDbContext.getLecturerById(id);
                if(lecturer != null) {
                    var result = this._applicationDbContext.deleteLecturer(lecturer.Id)
                    console.log(result);
                }
            }

        }
    };

    App.init();
    
});