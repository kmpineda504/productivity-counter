const templates = {

  cargo: {

    "Service Desk & Internal Case": [
      {
        title: "SD - Location Inquiry",
        text: "dear SD, can you please advise if this shipment is well located?"
      },

      {
        title: "SD - Offload Reason",
        text: "dear SD, please advise the reason for the latest offload and rebooking of this shipment? thank you"
      },
      {
        title: "SD - Documents inquire",
        text: "dear SD, the shipment was reportedly offloaded due to a documentation discrepancy. Could you please clarify the exact issue with the documentation? thank you"
      },
      {
        title: "IC - General Thank you",
        text: `Dear XXX team,

Thank you for the information provided.

We will communicate the update to the client accordingly.

Thank you for your support.

Regards,
Kevin
T&T`
      }
    ],

    "Shipment Rebooked – Reason Pending ": [
      {
        title:"",
        text: "The reason for the rebooking is still pending. We will keep you informed as soon as further information becomes available."
      },

      {
        title: "",
        text: "At this stage, the reason the shipment was not loaded on the originally booked flight has not yet been confirmed. We have requested additional information from our Ground Operations team and will share further details as soon as they become available."
      }
    ],

    "First available flight - FIRAV": [
      {
        title:"General",
        text: "Please note that this is the first available flight on which we were able to secure space for your shipment"
      },

      {
        title: "In-transit I",
        text: "Upon confirmation that the shipment has been received in XXX, the onward segment XXX - XXX will be rebooked on the first available flight with confirmed capacity. "
      },

      {
        title: "In-transit II",
        text: "The shipment remains under active follow-up. The onward segment XXX - XXX will be rebooked on the first available flight with confirmed capacity."
      },
      {
        title: "Original flight - No longer available",
        text: "Please note that the original flight option is no longer available. The shipment has therefore been booked on the earliest available alternative routing on which capacity could be secured."
      }
    ],
    
    "Pending Information": [
      {
        title:"General",
        text: `On regards to your shipment AWB {{{Case.AWB_Number__c}}},

We are currently following up with the relevant teams to gather additional information and obtain a more accurate update on the shipment.

We will keep you informed as soon as further details become available.

We apologize for the delay and appreciate your patience.`
      }
    ],


    "Shipment status": [
      {
        title:"In-transit",
        text: `Regarding your shipment AWB {{{Case.AWB_Number__c}}},  

I'd like to inform you that, according to our records, your shipment is currently in transit following its departure on flight XXX from {{{Case.Origin_Station__c}}} on DATE. 

At this time, no irregularities have been reported, and the shipment is progressing as scheduled. 

Should you require any additional information, please do not hesitate to contact us. `
      },

      {
        title:"Arrival NTF",
        text: `Regarding your shipment AWB {{{Case.AWB_Number__c}}},  

I'd like to inform you that, according to our records your shipment has arrived in {{{Case.Destination_Station__c}}} onboard flight XXX, which departed on DATE.  

The consignee has been notified for collection.  

Should you require any additional information, please do not hesitate to contact us.`
      },

      {
        title:"Delivery confirmation",
        text: `Regarding your shipment AWB {{{Case.AWB_Number__c}}}, 

I'd like to inform you, that according to our records; your shipment has arrived in {{{Case.Destination_Station__c}}} onboard flight XXX, which departed on DATE and was subsequently delivered to the consignee. 

Should you require any additional information, please do not hesitate to contact us.`
      },

      {
        title:"Consignment manifested",
        text: `Regarding your shipment AWB {{{Case.AWB_Number__c}}},  

According to our records, the shipment has been manifested on the following flight:

[Insert flights]

Based on the latest information available, the shipment has been assigned to this service for transportation. We will continue to monitor its progress and keep you informed of any further updates

Should you require any additional information, please do not hesitate to contact us. `
      }
  ],
    "Split Cargo ": [
      {
        title:"",
        text: `# pieces of the consignment have already arrived in XXX on flight XXXXX. 

For the remaining # piece, we have secured an earlier departure as follows: 
xxxxx `
      }
    ],
    "myCargo": [
      {
        title:"",
        text: "We kindly invite you to review the updated flight information in myCargo."
      }
    ],

    "Warehouse Storage Fees – Claim Guidance ": [
      {
        title:"",
        text: `We regret any frustration caused by the rebooking and understand your concern regarding weekend arrivals and potential storage costs. 
 
these storage fees are required by the import warehouse, are not charged by AFKL, and unfortunately we cannot waive these costs. However, you may submit pre and formal claims via our website so they can be handled directly in our claims system: https://www.afklcargo.com/mycargo/claim/new  `
      }
    ]

  
  },

  reservations: {

    "Flight Changes": [
      "Your booking has been updated as requested."
    ]

  },

  customer_care: {

    "Baggage": [
      "We regret the inconvenience caused by the baggage delay."
    ]

  }

};