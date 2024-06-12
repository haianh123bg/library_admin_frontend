import React from 'react';
import BookModel from '../../models/BookModel';
import { StickyHeadTable } from '../../components/StickyHeadTable';

export const BookTable: React.FC<{ books: BookModel[]; handleRemoveBook: any }> = (props) => {
    return <StickyHeadTable books={props.books} handleRemoveBook={props.handleRemoveBook} />;
};
