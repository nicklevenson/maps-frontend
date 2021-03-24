import {Header, Icon, Image} from 'semantic-ui-react'

const Heading = () => {
  return(
    <div>
      <Header as='h1' icon textAlign='center' className="brand">
        <i>Map Mate</i>
      </Header>
    </div>
  )
}

export default Heading