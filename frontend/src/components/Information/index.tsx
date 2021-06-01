import { FC } from "react";
import {
    RouteComponentProps
} from 'react-router-dom';

type BookIdProps = RouteComponentProps<{
    id: string;
}>;

const Information: FC<BookIdProps> = (props) => {
    const id = props.match.params.id;

    return <h1>This is book {id} information page.</h1>;
}

export default Information;