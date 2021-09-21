import './App.css'
import 'semantic-ui-css/semantic.min.css'
import contactsList from './contacts.json'
import {
  Grid,
  Image,
  Card,
  Icon,
  Header,
  Segment,
  Button,
} from 'semantic-ui-react'
import { useState } from 'react'

function App() {
  const [contacts, setContacts] = useState(contactsList.slice(0, 5))
  const [allContacts, setAllContacts] = useState(
    contactsList.slice(5, contactsList.length),
  )

  const addRandomContact = () => {
    const randNum = Math.floor(Math.random() * allContacts.length)
    const randContact = allContacts[randNum]

    if (randContact) {
      const filteredAllContacts = allContacts.filter(
        (contact) => contact.id !== randContact.id,
      )
      setAllContacts(filteredAllContacts)
      setContacts([...contacts, randContact])
    }
  }

  const sortByPopularity = () => {
    const sortedByPopularity = contacts.sort(
      (a, b) => b.popularity - a.popularity,
    )
    setContacts([...sortedByPopularity])
  }

  const sortByName = () => {
    const sortedByName = contacts.sort((a, b) =>
      a.name < b.name ? -1 : a.name > b.name ? 1 : 0,
    )
    setContacts([...sortedByName])
  }

  const deleteContact = (id) => {
    const newContacts = contacts.filter((contact) => contact.id !== id)
    setContacts([...newContacts])
  }

  return (
    <div className="App">
      <Segment className="nav">
        <Header as="h1">IronContacts</Header>
        <Grid container columns={3}>
          <Grid.Column>
            <Button onClick={addRandomContact}>Add random contact</Button>
          </Grid.Column>
          <Grid.Column>
            <Button onClick={sortByPopularity}>Sort by popularity</Button>
          </Grid.Column>
          <Grid.Column>
            <Button onClick={sortByName}>Sort by name</Button>
          </Grid.Column>
        </Grid>
      </Segment>

      <Grid container columns={3} className="body">
        {contacts.map((contact) => (
          <Grid.Column key={contact.id}>
            <Card>
              <Image
                src={contact.pictureUrl}
                alt={contact.name}
                wrapped
                ui={false}
              />
              <Card.Content>
                <Card.Header>{contact.name} </Card.Header>
              </Card.Content>
              <Card.Content>
                <span className="wonEmy">
                  Won Oscar:&emsp;
                  {contact.wonOscar ? (
                    <Icon name="trophy" />
                  ) : (
                    <Icon name="times" />
                  )}
                </span>
              </Card.Content>
              <Card.Content>
                <span className="wonEmy">
                  Won Emy:&emsp;
                  {contact.wonEmy ? (
                    <Icon name="trophy" />
                  ) : (
                    <Icon name="times" />
                  )}
                </span>
              </Card.Content>
              <Card.Content>
                {contact.name == 'Jennifer Lawrence' ? (
                  <Icon name="heart" color="red" />
                ) : (
                  <Icon name="heart" />
                )}

                {contact.popularity.toFixed(2)}
              </Card.Content>
              <Card.Content>
                <Button
                  inverted
                  color="red"
                  onClick={() => deleteContact(contact.id)}
                >
                  Delete
                </Button>
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </Grid>
    </div>
  )
}

export default App

/**
 * 
    "name": "Keanu Reeves",
    "pictureUrl": "https://image.tmdb.org/t/p/w500/1wpzvf5PaQ1AZjl5rPNjWQobLLP.jpg",
    "popularity": 12.267253,
    "id": "7cdd5950-55e0-4d9e-8959-2181ed5f12e6",
    "wonOscar": false,
    "wonEmmy": false
 * 
 */
