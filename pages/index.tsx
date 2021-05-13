import { NextPage } from 'next';

import FriendListProfile, {
  FriendListProfileProps,
} from '../src/components/elements/FriendListProfile/FriendListProfile';

const FriendList: FriendListProfileProps[] = [
  {
    steamid: 1,
    name: 'Darth Timbo',
    picture: 'https://app.rodey.nl/steam/assets/img/profiles/008.jpg',
    status: 'online',
  },
  {
    steamid: 2,
    name: 'Henkmans',
    nickname: 'Roel',
    picture: 'https://app.rodey.nl/steam/assets/img/profiles/004.jpg',
    status: 'playing',
    playing: 'Dota 2',
  },
  {
    steamid: 3,
    name: 'John Doe',
    status: 'online',
  },
  {
    steamid: 4,
    name: 'Sjoemi',
    nickname: 'Roel',
    picture: 'https://app.rodey.nl/steam/assets/img/profiles/002.jpg',
    status: 'playing',
    playing: 'Counter Strike: Global Offensive',
  },
  {
    steamid: 5,
    name: 'Ziggy',
    nickname: 'Grace',
    picture: 'https://app.rodey.nl/steam/assets/img/profiles/003.jpg',
    status: 'online',
    badge: 2,
  },
  {
    steamid: 6,
    name: 'John Doe',
    status: 'offline',
  },
];

const HomePage: NextPage = () => (
  <>
    {FriendList.map((friendInfo) => (
      <FriendListProfile key={friendInfo.steamid} {...friendInfo} />
    ))}
  </>
);

export default HomePage;
