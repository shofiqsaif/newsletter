const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
    apiKey: "62a1591c0e61861a0ec4e8ce598aeb38-us9",
    server: "us9",
});

// async function run() {
//   const response = await mailchimp.ping.get();
//   console.log(response);
// }

// run();



// const run = async () => {
//     const response = await mailchimp.lists.getAllLists();
//     console.log(response);
//   };
  
//   run();



// const run = async () => {
//   const response = await mailchimp.lists.getList("a933c15de4");
//   console.log(response);
// };

// run();


// const run = async () => {
//   const response = await mailchimp.lists.getListMembersInfo("a933c15de4");
//   console.log(response);
// };

// run();

// const run = async () => {
//   const response = await mailchimp.lists.addListMember("list_id", {
//     email_address: "test3@gmail.com",
//     status: "pending",
//   });
//   console.log(response);
// };

// run();


const run = async () => {
  const response = await mailchimp.lists.addListMember("a933c15de4", {
    email_address: "12345Ebony_Brekke@gmail.com",
    status: "subscribed",
  });
  console.log(response);
};

run();
