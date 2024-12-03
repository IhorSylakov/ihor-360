export interface Photo {
  id: string;
  panorama: string;
  thumbnail?: string;
  title?: string;
  hide?: boolean;
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

interface Country {
  name: string;
  cities: City[];
}

export const data: Country[] = [
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
                title: "Дворец маркизов Фронтейра 1",
                options: {
                  caption: 'Дворец маркизов Фронтейра 1',
                  description: 'description for Дворец маркизов Фронтейра 1 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11233605",
                panorama: "photo_11233605",
                title: "Дворец маркизов Фронтейра 2",
                options: {
                  caption: 'Дворец маркизов Фронтейра 2',
                  description: 'description for Дворец маркизов Фронтейра 2 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11233693",
                panorama: "photo_11233693",
                title: "Дворец маркизов Фронтейра 3",
                options: {
                  caption: 'Дворец маркизов Фронтейра 3',
                  description: 'description for Дворец маркизов Фронтейра 3 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11233709",
                panorama: "photo_11233709",
                title: "Дворец маркизов Фронтейра 4",
                options: {
                  caption: 'Дворец маркизов Фронтейра 4',
                  description: 'description for Дворец маркизов Фронтейра 4 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11233712",
                panorama: "photo_11233712",
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
                title: "Дворец маркизов Фронтейра 6",
                options: {
                  caption: 'Дворец маркизов Фронтейра 6',
                  description: 'description for Дворец маркизов Фронтейра 6 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11233727",
                panorama: "photo_11233727",
                title: "Дворец маркизов Фронтейра 7",
                options: {
                  caption: 'Дворец маркизов Фронтейра 7',
                  description: 'description for Дворец маркизов Фронтейра 7 <br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
            ],
          },
          {
            id: "place-002",
            name: "Где-то в Лиссабоне",
            photos: [
              {
                id: "image-photo_11233730",
                panorama: "photo_11233730",
              },
            ],
          },
          {
            id: "place-003",
            name: "Где-то в Лиссабоне",
            photos: [
              {
                id: "image-photo_11233731",
                panorama: "photo_11233731",
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
              },
            ],
          },
        ],
      },
    ],
  },
];
