/* Define Model Post */
function Post() {
    this.Id;
    this.Title;
    this.Synopsis;
    this.Story;

    this.CategoryId;
    this.Category;
    this.Tags;

    this.CreatedAt;
    this.UpdatedAt;
    this.DeletedAt;
};

/* Define Model Category */
function Category() {
    this.Id;
    this.Name;
    this.Description;

    this.CreatedAt;
    this.UpdatedAt;
    this.DeletedAt;
};

/* Define Model Tag */
function Category() {
    this.Id;
    this.Name;

    this.CreatedAt;
    this.UpdatedAt;
    this.DeletedAt;
};