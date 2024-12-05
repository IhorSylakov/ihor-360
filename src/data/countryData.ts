export interface Photo {
  id: string;
  panorama: string;
  thumbnail?: string;
  title?: string;
  hide?: boolean;
  type: '360' | 'plain';
  options?: {
    caption: string;
    description?: string;
  };
}

interface Place {
  id: string;
  name: string;
  photos: Photo[];
}

interface City {
  name: string;
  places: Place[];
}

export interface Country {
  name: string;
  cities: City[];
}

export const media: Country[] = [
  {
    name: "Portugal",
    cities: [
      {
        name: "Lisbon",
        places: [
          {
            id: "place-001",
            name: "Дворец маркизов Фронтейра",
            photos: [
              {
                id: "image-photo_11233512",
                panorama: "photo_11233512",
                type: "360",
                title: "Дворец маркизов Фронтейра 1",
                options: {
                  caption: 'Дворец маркизов Фронтейра 1',
                  description: 'description for Дворец маркизов Фронтейра 1 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11233605",
                panorama: "photo_11233605",
                type: "360",
                title: "Дворец маркизов Фронтейра 2",
                options: {
                  caption: 'Дворец маркизов Фронтейра 2',
                  description: 'description for Дворец маркизов Фронтейра 2 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11233693",
                panorama: "photo_11233693",
                type: "360",
                title: "Дворец маркизов Фронтейра 3",
                options: {
                  caption: 'Дворец маркизов Фронтейра 3',
                  description: 'description for Дворец маркизов Фронтейра 3 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11233709",
                panorama: "photo_11233709",
                type: "360",
                title: "Дворец маркизов Фронтейра 4",
                options: {
                  caption: 'Дворец маркизов Фронтейра 4',
                  description: 'description for Дворец маркизов Фронтейра 4 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240153",
                panorama: "photo_11240153",
                type: "360",
                title: "Дворец маркизов Фронтейра 5",
                options: {
                  caption: 'Дворец маркизов Фронтейра 5',
                  description: 'description for Дворец маркизов Фронтейра 5 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
                hide: true,
              },
              {
                id: "image-photo_11233723",
                panorama: "photo_11233723",
                type: "360",
                title: "Дворец маркизов Фронтейра 6",
                options: {
                  caption: 'Дворец маркизов Фронтейра 6',
                  description: 'description for Дворец маркизов Фронтейра 6 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11233727",
                panorama: "photo_11233727",
                type: "360",
                title: "Дворец маркизов Фронтейра 7",
                options: {
                  caption: 'Дворец маркизов Фронтейра 7',
                  description: 'description for Дворец маркизов Фронтейра 7 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240144",
                panorama: "photo_11240144",
                type: "360",
                title: "Дворец маркизов Фронтейра 8",
                options: {
                  caption: 'Дворец маркизов Фронтейра 8',
                  description: 'description for Дворец маркизов Фронтейра 8 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240145",
                panorama: "photo_11240145",
                type: "360",
                title: "Дворец маркизов Фронтейра 9",
                options: {
                  caption: 'Дворец маркизов Фронтейра 9',
                  description: 'description for Дворец маркизов Фронтейра 9 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240147",
                panorama: "photo_11240147",
                type: "360",
                title: "Дворец маркизов Фронтейра 10",
                options: {
                  caption: 'Дворец маркизов Фронтейра 10',
                  description: 'description for Дворец маркизов Фронтейра 10 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240151",
                panorama: "photo_11240151",
                type: "360",
                title: "Дворец маркизов Фронтейра 11",
                options: {
                  caption: 'Дворец маркизов Фронтейра 11',
                  description: 'description for Дворец маркизов Фронтейра 11 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240153",
                panorama: "photo_11240153",
                type: "360",
                title: "Дворец маркизов Фронтейра 12",
                options: {
                  caption: 'Дворец маркизов Фронтейра 12',
                  description: 'description for Дворец маркизов Фронтейра 12 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240183",
                panorama: "photo_11240183",
                type: "360",
                title: "Дворец маркизов Фронтейра 13",
                options: {
                  caption: 'Дворец маркизов Фронтейра 13',
                  description: 'description for Дворец маркизов Фронтейра 13 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240197",
                panorama: "photo_11240197",
                type: "360",
                title: "Дворец маркизов Фронтейра 14",
                options: {
                  caption: 'Дворец маркизов Фронтейра 14',
                  description: 'description for Дворец маркизов Фронтейра 14 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
            ],
          },
          {
            id: "place-002",
            name: "Жеронимуш",
            photos: [
              {
                id: "image-photo_11233731",
                panorama: "photo_11233731",
                type: "360",
                title: "Жеронимуш 1",
                options: {
                  caption: 'Жеронимуш 1',
                  description: 'description for Жеронимуш 1 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240199",
                panorama: "photo_11240199",
                type: "360",
                title: "Жеронимуш 2",
                options: {
                  caption: 'Жеронимуш 2',
                  description: 'description for Жеронимуш 2 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240214",
                panorama: "photo_11240214",
                type: "360",
                title: "Жеронимуш 3",
                options: {
                  caption: 'Жеронимуш 3',
                  description: 'description for Жеронимуш 3 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
            ],
          },
          {
            id: "place-003",
            name: "Где-то в Лиссабоне",
            photos: [
              {
                id: "image-photo_11233730",
                panorama: "photo_11233730",
                type: "360",
              },
            ],
          },
        ],
      },
      {
        name: "Sintra",
        places: [
          {
            id: "place-004",
            name: "Где-то в Синтре",
            photos: [
              {
                id: "image-photo_11233733",
                panorama: "photo_11233733",
                type: "360",
              },
            ],
          },
        ],
      },
    ],
  },
  // {
  //   name: "Country",
  //   cities: [
  //     {
  //       name: "City",
  //       places: [
  //         {
  //           id: "place-004",
  //           name: "Place name",
  //           photos: [
  //             {
  //               id: "image-photo_11233733",
  //               panorama: "photo_11233733",
  //               type: "360",
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export const stories: Country[] = [
  {
    name: "Portugal",
    cities: [
      {
        name: "Lisbon",
        places: [
          {
            id: "place-001",
            name: "Дворец маркизов Фронтейра",
            photos: [
              {
                id: "image-photo_11233512",
                panorama: "photo_11233512",
                type: "360",
                title: "Дворец маркизов Фронтейра 1",
                options: {
                  caption: 'Дворец маркизов Фронтейра 1',
                  description: 'description for Дворец маркизов Фронтейра 1 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11233605",
                panorama: "photo_11233605",
                type: "360",
                title: "Дворец маркизов Фронтейра 2",
                options: {
                  caption: 'Дворец маркизов Фронтейра 2',
                  description: 'description for Дворец маркизов Фронтейра 2 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11233693",
                panorama: "photo_11233693",
                type: "360",
                title: "Дворец маркизов Фронтейра 3",
                options: {
                  caption: 'Дворец маркизов Фронтейра 3',
                  description: 'description for Дворец маркизов Фронтейра 3 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11233709",
                panorama: "photo_11233709",
                type: "360",
                title: "Дворец маркизов Фронтейра 4",
                options: {
                  caption: 'Дворец маркизов Фронтейра 4',
                  description: 'description for Дворец маркизов Фронтейра 4 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240153",
                panorama: "photo_11240153",
                type: "360",
                title: "Дворец маркизов Фронтейра 5",
                options: {
                  caption: 'Дворец маркизов Фронтейра 5',
                  description: 'description for Дворец маркизов Фронтейра 5 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
                hide: true,
              },
              {
                id: "image-photo_11233723",
                panorama: "photo_11233723",
                type: "360",
                title: "Дворец маркизов Фронтейра 6",
                options: {
                  caption: 'Дворец маркизов Фронтейра 6',
                  description: 'description for Дворец маркизов Фронтейра 6 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11233727",
                panorama: "photo_11233727",
                type: "360",
                title: "Дворец маркизов Фронтейра 7",
                options: {
                  caption: 'Дворец маркизов Фронтейра 7',
                  description: 'description for Дворец маркизов Фронтейра 7 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240144",
                panorama: "photo_11240144",
                type: "360",
                title: "Дворец маркизов Фронтейра 8",
                options: {
                  caption: 'Дворец маркизов Фронтейра 8',
                  description: 'description for Дворец маркизов Фронтейра 8 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240145",
                panorama: "photo_11240145",
                type: "360",
                title: "Дворец маркизов Фронтейра 9",
                options: {
                  caption: 'Дворец маркизов Фронтейра 9',
                  description: 'description for Дворец маркизов Фронтейра 9 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240147",
                panorama: "photo_11240147",
                type: "360",
                title: "Дворец маркизов Фронтейра 10",
                options: {
                  caption: 'Дворец маркизов Фронтейра 10',
                  description: 'description for Дворец маркизов Фронтейра 10 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240151",
                panorama: "photo_11240151",
                type: "360",
                title: "Дворец маркизов Фронтейра 11",
                options: {
                  caption: 'Дворец маркизов Фронтейра 11',
                  description: 'description for Дворец маркизов Фронтейра 11 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240153",
                panorama: "photo_11240153",
                type: "360",
                title: "Дворец маркизов Фронтейра 12",
                options: {
                  caption: 'Дворец маркизов Фронтейра 12',
                  description: 'description for Дворец маркизов Фронтейра 12 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240183",
                panorama: "photo_11240183",
                type: "360",
                title: "Дворец маркизов Фронтейра 13",
                options: {
                  caption: 'Дворец маркизов Фронтейра 13',
                  description: 'description for Дворец маркизов Фронтейра 13 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240197",
                panorama: "photo_11240197",
                type: "360",
                title: "Дворец маркизов Фронтейра 14",
                options: {
                  caption: 'Дворец маркизов Фронтейра 14',
                  description: 'description for Дворец маркизов Фронтейра 14 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
            ],
          },
          {
            id: "place-002",
            name: "Жеронимуш",
            photos: [
              {
                id: "image-photo_11233731",
                panorama: "photo_11233731",
                type: "360",
                title: "Жеронимуш 1",
                options: {
                  caption: 'Жеронимуш 1',
                  description: 'description for Жеронимуш 1 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240199",
                panorama: "photo_11240199",
                type: "360",
                title: "Жеронимуш 2",
                options: {
                  caption: 'Жеронимуш 2',
                  description: 'description for Жеронимуш 2 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240214",
                panorama: "photo_11240214",
                type: "360",
                title: "Жеронимуш 3",
                options: {
                  caption: 'Жеронимуш 3',
                  description: 'description for Жеронимуш 3 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
            ],
          },
          {
            id: "place-003",
            name: "Где-то в Лиссабоне",
            photos: [
              {
                id: "image-photo_11233730",
                panorama: "photo_11233730",
                type: "360",
              },
            ],
          },
        ],
      },
    ],
  },
];
