const noticeTemplates = [
    {
        title: "Event Reminder Notice",
        content: `
        Dear [Client's Name],
        
        This is a friendly reminder about the upcoming event on [Event Date]. Please let me know if there are any changes or additional details you would like to discuss.
        
        Looking forward to it!
        
        Best,
        [Your Name]
        `
    },
    {
        title: "Cancellation Notice",
        content: `
        Dear [Client's Name],
        
        I regret to inform you that I will not be able to perform at [Event Name] on [Event Date] due to [Reason]. I apologize for any inconvenience this may cause.
        
        Thank you for your understanding.
        
        Sincerely,
        [Your Name]
        `
    }
];

module.exports = noticeTemplates;
