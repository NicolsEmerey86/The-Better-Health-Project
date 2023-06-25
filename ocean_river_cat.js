//1. Create an object to contain the initiative's resources 
var resources = {
    mentalHealth: {
        education: [],
        resources: []
    },
    physicalHealth: {
        education: [],
        resources: []
    }
};

//2. Define a function to add resources to the initiative's resources object
function addResource(healthType, type, resource) {
    resources[healthType][type].push(resource);
}

//3. Use the addResource function to add resources to the object
addResource('mentalHealth', 'education', 'Webinars');
addResource('mentalHealth', 'resources', 'Apps');
addResource('physicalHealth', 'education', 'Nutrition Guides');
addResource('physicalHealth', 'resources', 'Fitness Trackers');

//4. Create a function to access the resources and education in the initiative
function accessResources(healthType, type) {
    return resources[healthType][type];
}

//5. Create a function to print the resources to the console
function printResources(healthType, type) {
    console.log('Available ' + type + ' for ' + healthType + ': ' + 
    accessResources(healthType, type).join(', '));
}

//6. Use the printResources function to print the resources and education to the console
printResources('mentalHealth', 'education');
printResources('mentalHealth', 'resources');
printResources('physicalHealth', 'education');
printResources('physicalHealth', 'resources');

//7. Create a function to create and maintain a list of initiative subscribers
function addSubscriber(email) {
    var subscriberList = [];
    subscriberList.push(email);
}

//8. Create a function to access the subscriber list
function accessSubscribers() {
    return subscriberList;
}

//9. Create a function to send emails to subscribers
function sendEmail(list, message) {
    for (var i = 0; i < list.length; i++) {
        var email = list[i];
        //send email code here
    }
}

//10. Create a function to send an email to all subscribers
function sendEmailToAll(message) {
    sendEmail(accessSubscribers(), message);
}

//11. Use the sendEmailToAll function to send a message to all subscribers
sendEmailToAll('Check out the latest resources in our initiative!');

//12. Create a function to generate a monthly report
function generateMonthlyReport(subscriberCount, resourceCount) {
    console.log("This month, the initiative had " + subscriberCount + " subscribers and added " + resourceCount + " resources.");
}

//13. Use the generateMonthlyReport function to generate a monthly report
generateMonthlyReport(accessSubscribers().length, 
    accessResources('mentalHealth', 'education').length + accessResources('mentalHealth', 'resources').length + 
    accessResources('physicalHealth', 'education').length + accessResources('physicalHealth', 'resources').length);

//14. Create a function to track clicks on initiative resources 
function trackResourceClicks(resourceType, resourceName, clicks) {
    var resourceTracking = {};
    resourceTracking[resourceName] = clicks;
    console.log(resourceName + " was clicked " + clicks + " times in the last month.");
}

//15. Track clicks on initiative resources
trackResourceClicks('education', 'Webinars', 100);
trackResourceClicks('resources', 'Apps', 50);
trackResourceClicks('education', 'Nutrition Guides', 30);
trackResourceClicks('resources', 'Fitness Trackers', 10);

//16. Create a function to track how often the initiative is mentioned on social media
function trackSocialMedia(mentions) {
    console.log("The initiative was mentioned " + mentions + " times on social media this month.");
}

//17. Track how often the initiative is mentioned on social media
trackSocialMedia(150);

//18. Create an event listener for clicks on initiative resources
document.addEventListener('click', function (e) {
    if (e.target.matches('.initiative-resource')) {
        var resourceName = e.target.dataset.resource;
        if (resourceName) {
            //track clicks code here
        }
    }
});

//19. Create an event listener for mentions of the initiative on social media
document.addEventListener('keyup', function (e) {
    if (e.target.matches('.social-media-textbox')) {
        var text = e.target.value;
        //track mentions code here
    }
});

//20. Create a function to measure the impact of the initiative
function measureImpact(subscribers, resources, resourceClicks, socialMediaMentions) {
    console.log("The initiative has " + subscribers + " subscribers, " + resources + " resources, " + 
    resourceClicks + " resource clicks, and " + socialMediaMentions + " social media mentions."); 
}

//21. Use the measureImpact function to measure the impact of the initiative
measureImpact(accessSubscribers().length, 
    accessResources('mentalHealth', 'education').length + accessResources('mentalHealth', 'resources').length + 
    accessResources('physicalHealth', 'education').length + accessResources('physicalHealth', 'resources').length, 
    100 + 50 + 30 + 10, 
    150);