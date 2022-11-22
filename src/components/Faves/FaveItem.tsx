
import { Button,   ButtonProps,   List, Rating, RatingProps, } from 'semantic-ui-react'

type results ={
	name: string
	rating: string;
}
 interface Props{
	 fave: results;
	 handleRating: (event: React.MouseEvent<HTMLDivElement>, data: RatingProps) => void;
	 handleRemove: (event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) => void
 }
const FaveItem = ({ fave, handleRating, handleRemove }:Props)=> (

	<List.Item>
		<img className='ui mini circular image' src="avatar.jpg" alt="avatar" />
		<List.Content>
			{fave.name} <Button onClick={handleRemove} size="mini" icon={{ name: 'delete', color: 'red' }} basic />
		</List.Content>
		<List.Content>
			<Rating onRate={handleRating} maxRating={5} icon="star" size="mini" rating={fave.rating} />
		</List.Content>
	</List.Item>
)

export default FaveItem
