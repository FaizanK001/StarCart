
import { Button, Card, Loader, Message } from 'semantic-ui-react'
import { useGetFilmsQuery } from '../services/swapApi'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { addFave } from '../features/faves'
import FilmDetails from './FilmDetails'
import usePagination from '../hooks/pagination'

const Films = ({dat, itemsPerPage, startFrom}) => {
	const { data, isError, isLoading } = useGetFilmsQuery()

  console.log(data)
	const dispatch = useDispatch()

	 console.log(data?.results?.length);

	const { pagination, prevPage, nextPage, changePage } = usePagination({dat, itemsPerPage, startFrom});



	const selectFilm = e => {
		const { title } = e.currentTarget.dataset
		const film = data.results.find(film => film.title === title)
		return film
	}
	const addToFavourites = e => dispatch(addFave(selectFilm(e)))


	if (isLoading) {
		return <Loader active={isLoading} />
	}
	if (isError) {
		return <Message error={isError}>There was an error</Message>
	}
	if (data && Boolean(data?.results?.length)) {
		return (
			<>
			<Card.Group centered>
				{data.results.map(film => (
					<Card key={nanoid()}>
						<Card.Content>
							<Card.Header>{film.title}</Card.Header>
							{film && film.characters && <Card.Meta> characters : {film.characters.length}</Card.Meta>}
							<Card.Description>{film.opening_crawl}</Card.Description>
						</Card.Content>
						<Card.Content extra>
							<FilmDetails details={film} />
							<Button
								icon={{ name: 'plus', size: 'small' }}
								data-title={film.title}
								positive
								content="Add to faves"
								onClick={addToFavourites}
							/>
						</Card.Content>
					</Card>
				))}
			</Card.Group>
			<div style={{textAlign: 'center', alignContent: 'center'}}>
			<nav className="pagination">
        <a href="/#" className="pagination-previous" onClick={prevPage}>Previous</a>
        <a href="/#" className="pagination-next" onClick={nextPage}>Next</a>
        <ul className="pagination-list">
          {pagination.map(page => {
              if(!page.ellipsis) {
                return <li key={page.id}>
                  <a
                    href="/#"
                    className={page.current ? 'pagination-link is-current' : 'pagination-link'}
                    onClick={(e) => changePage(page.id, e)}
                  >
                    {page.id}
                  </a>
                </li>
              }else {
                return <li key={page.id}><span className="pagination-ellipsis">&hellip;</span></li>
              }
          })}
        </ul>
      </nav>
			</div>
			</>
		)
	} else if (data?.results?.length === 0) {
		return <Message warning>no films found</Message>
	}
	return null
}
export default Films
