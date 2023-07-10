import MuiCarousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';

function Item(props) {
    return (
        <Paper sx={{ height: '500px', width: '500px', background: 'red'}}>
            {/* <h2>{props.item.name}</h2>
            <div style={{ width: '100%', height: '300px', backgroundColor: 'lightgray', textAlign: 'center', fontSize: '50px' }}>
                100% x 300
            </div>
            <p>{props.item.description}</p> */}
        </Paper>
    );
}

export default function Carousel(props) {
    let items = [
        {
            name: "Item 1",
            description: "Description 1"
        },
        {
            name: "Item 2",
            description: "Description 2"
        },
        {
            name: "Item 3",
            description: "Description 3"
        }
    ];

    return (
        <MuiCarousel>
            {items.map((item, i) => (
                <Item key={i} item={item} />
            ))}
        </MuiCarousel>
    );
}
