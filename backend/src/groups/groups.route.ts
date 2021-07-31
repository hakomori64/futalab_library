import { Routes } from 'nest-router';
import { GroupsModule } from './groups.module';
import { RentalsModule } from './rentals/rentals.module';
import { BookModule } from './book/book.module';
import { ReturnModule } from './return/return.module';
import { BorrowModule } from './borrow/borrow.module';

export const route: Routes = [
    {
        path: '/groups',
        module: GroupsModule,
        children: [
            {
                path: ':groupId/books',
                module: BookModule
            },
            {
                path: ':groupId/returns',
                module: ReturnModule
            },
            {
                path: ':groupId/borrows',
                module: BorrowModule
            },
            {
                path: ':groupId/rentals',
                module: RentalsModule
            }
        ]
    }
]