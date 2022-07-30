import { DataSource } from 'typeorm';
import Profile from '../profile/profile.entity';
import { User } from '../user/user.entity';
import Image from '../image/image.entity';

export const providersRepository = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'PROFILE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Profile),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'IMAGE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Image),
    inject: ['DATA_SOURCE'],
  },
];

