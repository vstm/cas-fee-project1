Handlebars.registerHelper("checkedIf", function(fieldValue, value) {
    return (value === undefined || typeof value === "object" ? fieldValue : (fieldValue === value)) ? "checked" : "";
});

Handlebars.registerHelper("selectedIf", function(fieldValue, value) {
    return (value === undefined || typeof value === "object" ? fieldValue : (fieldValue === value)) ? "selected" : "";
});

Handlebars.registerHelper("formatDate", function(datetime, nullValue) {
    if (!datetime) {
        return nullValue;
    }
    
    return moment(datetime).fromNow();
});

Handlebars.registerHelper("formatEditDate", function(datetime) {
    if (!datetime) {
        return "";
    }
    
    return moment(datetime).format('YYYY-MM-DD');
});

Handlebars.registerHelper('formatPriority', function(value, sign) {
    return sign.repeat(value);
});
