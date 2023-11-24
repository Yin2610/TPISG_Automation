function onOpen() {
  let ui = SpreadsheetApp.getUi();
  ui.createMenu('TPISG menu')
  .addItem('📲 Add to Google Contact', 'addContacts')
  .addToUi();
}

function addContacts() { 

  let spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadSheet.getSheets()[0];
  let data = sheet.getDataRange().getValues();
  const contactsList = [];
  for (const row of data) {
    let name = row[1];
    let phoneNo = row[5];
    if (name == "Full Name (as per NRIC)" || phoneNo == "Contact Number") {
      continue;
    }
    
    const contactToCreate = {
      "contactPerson": {
        "names": [
          {
            "givenName": name
          }
        ],
        "phoneNumbers": [
          {
            "value": phoneNo.toString()
          }
        ]
      }
    }
    contactsList.push(contactToCreate);
  }
  const requestBody = {
    "contacts": contactsList,
    "readMask": "names,phoneNumbers"
  };
  const response = People.People.batchCreateContacts(requestBody);
  console.log(response);
}
