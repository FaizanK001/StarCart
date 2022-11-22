import {  Card, Loader, Message } from 'semantic-ui-react'
import { useGetCharactersQuery } from '../services/swapApi'
import { nanoid } from '@reduxjs/toolkit'

const Characters = () => {
	const { data, isError, isLoading } = useGetCharactersQuery()

	if (isLoading) {
		return <Loader active={isLoading} />
	}
	if (isError) {
		return <Message error={isError}>There was an error</Message>
	}
	if (data && Boolean(data?.results?.length)) {

	return (
		<Card.Group centered>
				{data.results.map(character => (
					<Card key={nanoid()}>
						<Card.Content>
							<Card.Header>{character.name}</Card.Header>
							 <Card.Description> Age : {character.birth_year}</Card.Description>
							<Card.Description>Height: {character.height}</Card.Description>
							<Card.Description>gender: {character.gender}</Card.Description>
							<Card.Description>Hair: {character.hair_color}</Card.Description>
							<Card.Description>Skin Color: {character.skin_color}</Card.Description>
							{/* <Card.Description>Films: {character.films}</Card.Description> */}
							<a
								data-title= 'Films'
								href={character.films}
							>Films</a>
						</Card.Content>
					</Card>
				))}
			</Card.Group>
	)
}
}
export default Characters
