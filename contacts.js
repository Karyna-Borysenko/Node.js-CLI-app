const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");
const { nanoid } = require("nanoid");

//  List of all contacts
const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

// Get Contact By Id
const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};

// Add Contact
const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

// Remove Contact
const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

// Export
module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
