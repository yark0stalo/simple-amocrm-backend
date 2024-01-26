import { Controller, Get, Query } from '@nestjs/common';
import { token } from 'src/token';
import { subdomain } from 'src/subdomain';

const fetchLinks = {
  leadLink: 'https://' + subdomain + '.amocrm.ru/api/v4/leads?with=contacts',
  pipilineLink: 'https://' + subdomain + '.amocrm.ru/api/v4/leads/pipelines',
  contactsLink: 'https://' + subdomain + '.amocrm.ru/api/v4/contacts',
  usersLink: 'https://' + subdomain + '.amocrm.ru/api/v4/users',
};

@Controller('leads')
export class LeadsController {
  @Get()
  async getLeads(@Query('query') query: string): Promise<object[]> {
    // Создание требуемых полей
    const leads = [];
    const contacts = [];
    const users = [];
    const statuses = [];
    const result = [];
    //-----------------
    // Формирование запроса к сделкам
    const headers: Headers = new Headers();
    headers.append(
      'Authorization',
      'Bearer ' + token.access_token, //client.token.getValue().access_token,
    );
    const queryString: string = query ? '&query=' + query : '';
    await fetch(fetchLinks.leadLink + queryString, {
      method: 'GET',
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        data._embedded.leads.forEach((lead) => {
          leads.push({
            id: lead.id,
            name: lead.name,
            price: lead.price,
            created_at: new Date(lead.created_at * 1000).toLocaleString(),
            responsible_user_id: lead.responsible_user_id,
            status_id: lead.status_id,
            pipeline_id: lead.pipeline_id,
            contacts: lead._embedded['contacts'],
          });
        });
      })
      .catch((err) => console.log(err));
    // --------------
    await fetch(fetchLinks.contactsLink, { method: 'GET', headers: headers })
      .then((res) => res.json())
      .then((data) => {
        data._embedded.contacts.forEach((contact) => {
          contacts.push({
            id: contact.id,
            name: contact.name,
            phone_number: contact.custom_fields_values[0].values[0].value,
            email: contact.custom_fields_values[1].values[0].value,
          });
        });
      })
      .catch((err) => console.log(err));
    await fetch(fetchLinks.pipilineLink, { method: 'GET', headers: headers })
      .then((res) => res.json())
      .then((data) => {
        data._embedded.pipelines[0]._embedded.statuses.forEach((status) => {
          statuses.push({
            id: status.id,
            name: status.name,
            color: status.color,
          });
        });
      })
      .catch((err) => console.log(err));
    await fetch(fetchLinks.usersLink, { method: 'GET', headers: headers })
      .then((res) => res.json())
      .then((data) => {
        data._embedded.users.forEach((user) => {
          users.push({ id: user.id, name: user.name });
        });
      })
      .catch((err) => console.log(err));
    leads.forEach((lead) => {
      const currentContacts = [];
      lead.contacts.forEach((contact) => {
        currentContacts.push(contacts.find((cont) => cont.id === contact.id));
      });
      result.push({
        id: lead.id,
        name: lead.name,
        price: lead.price,
        created_at: lead.created_at,
        responsible_user: users.find(
          (user) => user.id === lead.responsible_user_id,
        ).name,
        status: statuses.find((status) => status.id === lead.status_id),
        contacts: currentContacts,
      });
    });
    return result;
  }
}
