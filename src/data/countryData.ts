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
  preview?: string;
  photos: Photo[];
}

interface City {
  name: string;
  preview?: string;
  places: Place[];
}

export interface Country {
  name: string;
  preview?: string;
  cities: City[];
}

export const media: Country[] = [
  {
    name: "Portugal",
    cities: [
      {
        name: "Lisbon",
        preview: "https://lh3.googleusercontent.com/gps-proxy/ALd4DhGYcfnzkdNjtV-tzAFR-DmKx_KHHO0QPCC7uvw6tLsfQ1cE0aO_O0LWD2YGjox8au7Ffjpi82GmZ284_FH4XtvAmxFBgvx6SHyx9SeEWIIBKXtGEBaacWiW7Q-lVOSroBwgEEstXiIiJIZd2eLZ25-6mAVjMVeWy2qYjUHm1Hv8ruwa-4TdIvAC=w408-h272-k-no",
        places: [
          {
            id: "place-001",
            name: "Дворец маркизов Фронтейра",
            preview: "https://lh5.googleusercontent.com/p/AF1QipMpQDsVLw3pqt9INwaSEaBDur0alI_3Ar6Beo4J=w408-h306-k-no",
            photos: [
              {
                id: "image-photo_11233512",
                panorama: "photo_11233512",
                type: "360",
                title: "Дворец маркизов Фронтейра 1",
                options: {
                  caption: 'Дворец маркизов Фронтейра 1',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11233512/img-20241018-120153-00-001"> ' +
                    'https://www.clickasnap.com/image/11233512/img-20241018-120153-00-001' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11233605",
                panorama: "photo_11233605",
                type: "360",
                title: "Дворец маркизов Фронтейра 2",
                options: {
                  caption: 'Дворец маркизов Фронтейра 2',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11233605/img-20241018-121213-00-003"> ' +
                    'https://www.clickasnap.com/image/11233605/img-20241018-121213-00-003' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11233693",
                panorama: "photo_11233693",
                type: "360",
                title: "Дворец маркизов Фронтейра 3",
                options: {
                  caption: 'Дворец маркизов Фронтейра 3',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11233693/img-20241018-121232-00-004"> ' +
                    'https://www.clickasnap.com/image/11233693/img-20241018-121232-00-004' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11233709",
                panorama: "photo_11233709",
                type: "360",
                title: "Дворец маркизов Фронтейра 4",
                options: {
                  caption: 'Дворец маркизов Фронтейра 4',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11233709/img-20241018-121612-00-005"> ' +
                    'https://www.clickasnap.com/image/11233709/img-20241018-121612-00-005' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240153",
                panorama: "photo_11240153",
                type: "360",
                title: "Дворец маркизов Фронтейра 5",
                options: {
                  caption: 'Дворец маркизов Фронтейра 5',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11240153/img-20241018-122429-00-008"> ' +
                    'https://www.clickasnap.com/image/11240153/img-20241018-122429-00-008' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
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
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11233723/img-20241018-123453-00-010"> ' +
                    'https://www.clickasnap.com/image/11233723/img-20241018-123453-00-010' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11233727",
                panorama: "photo_11233727",
                type: "360",
                title: "Дворец маркизов Фронтейра 7",
                options: {
                  caption: 'Дворец маркизов Фронтейра 7',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11233727/img-20241018-124026-00-011"> ' +
                    'https://www.clickasnap.com/image/11233727/img-20241018-124026-00-011' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240144",
                panorama: "photo_11240144",
                type: "360",
                title: "Дворец маркизов Фронтейра 8",
                options: {
                  caption: 'Дворец маркизов Фронтейра 8',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11240144/img-20241018-120759-00-002"> ' +
                    'https://www.clickasnap.com/image/11240144/img-20241018-120759-00-002' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240145",
                panorama: "photo_11240145",
                type: "360",
                title: "Дворец маркизов Фронтейра 9",
                options: {
                  caption: 'Дворец маркизов Фронтейра 9',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11240145/img-20241018-121701-00-006"> ' +
                    'https://www.clickasnap.com/image/11240145/img-20241018-121701-00-006' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240147",
                panorama: "photo_11240147",
                type: "360",
                title: "Дворец маркизов Фронтейра 10",
                options: {
                  caption: 'Дворец маркизов Фронтейра 10',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11240147/img-20241018-123250-00-009"> ' +
                    'https://www.clickasnap.com/image/11240147/img-20241018-123250-00-009' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240151",
                panorama: "photo_11240151",
                type: "360",
                title: "Дворец маркизов Фронтейра 11",
                options: {
                  caption: 'Дворец маркизов Фронтейра 11',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11240151/img-20241018-121750-00-007"> ' +
                    'https://www.clickasnap.com/image/11240151/img-20241018-121750-00-007' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240183",
                panorama: "photo_11240183",
                type: "360",
                title: "Дворец маркизов Фронтейра 12",
                options: {
                  caption: 'Дворец маркизов Фронтейра 12',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11240183/img-20241018-124124-00-012"> ' +
                    'https://www.clickasnap.com/image/11240183/img-20241018-124124-00-012' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240197",
                panorama: "photo_11240197",
                type: "360",
                title: "Дворец маркизов Фронтейра 13",
                options: {
                  caption: 'Дворец маркизов Фронтейра 13',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11240197/img-20241018-124506-00-013"> ' +
                    'https://www.clickasnap.com/image/11240197/img-20241018-124506-00-013' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
            ],
          },
          {
            id: "place-002",
            name: "Жеронимуш",
            preview: "https://lh5.googleusercontent.com/p/AF1QipPdzHA5ZNjLqAzppqZd3aNSsYlWFtxqe9FHy3-c=w408-h544-k-no",
            photos: [
              {
                id: "image-photo_11233731",
                panorama: "photo_11233731",
                type: "360",
                title: "Жеронимуш 1",
                options: {
                  caption: 'Жеронимуш 1',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11233731/img-20241018-140812-00-015"> ' +
                    'https://www.clickasnap.com/image/11233731/img-20241018-140812-00-015' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240199",
                panorama: "photo_11240199",
                type: "360",
                title: "Жеронимуш 2",
                options: {
                  caption: 'Жеронимуш 2',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11240199/img-20241018-141602-00-016"> ' +
                    'https://www.clickasnap.com/image/11240199/img-20241018-141602-00-016' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240214",
                panorama: "photo_11240214",
                type: "360",
                title: "Жеронимуш 3",
                options: {
                  caption: 'Жеронимуш 3',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11240214/img-20241018-143348-00-017"> ' +
                    'https://www.clickasnap.com/image/11240214/img-20241018-143348-00-017' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11244281",
                panorama: "photo_11244281",
                type: "360",
                title: "Жеронимуш 4",
                options: {
                  caption: 'Жеронимуш 4',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11244281/img-20241018-150841-00-018"> ' +
                    'https://www.clickasnap.com/image/11244281/img-20241018-150841-00-018' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11244287",
                panorama: "photo_11244287",
                type: "360",
                title: "Жеронимуш 5",
                options: {
                  caption: 'Жеронимуш 5',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11244287/img-20241018-151220-00-019"> ' +
                    'https://www.clickasnap.com/image/11244287/img-20241018-151220-00-019' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
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
                title: "По дороге от Дворца маркизов Фронтейра",
                options: {
                  caption: 'По дороге от Дворца маркизов Фронтейра',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11233730/img-20241018-132130-00-014"> ' +
                    'https://www.clickasnap.com/image/11233730/img-20241018-132130-00-014' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
            ],
          },
        ],
      },
      {
        name: "Sintra",
        preview: "https://lh5.googleusercontent.com/p/AF1QipM9NN7bQjV9DTKVKY5grO-ExfLlQlQ4wKQgYYYY=w408-h509-k-no",
        places: [
          {
            id: "place-004",
            name: "Дворец Пена",
            preview: "https://lh5.googleusercontent.com/p/AF1QipPhTLRmpoyJnF_or8Ka6W6MM6uq0SeI-NmXiWvo=w408-h272-k-no",
            photos: [
              {
                id: "image-photo_11233733",
                panorama: "photo_11233733",
                type: "360",
                title: "Дворец Пена 1",
                options: {
                  caption: 'Дворец Пена 1',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11244287/img-20241018-151220-00-019"> ' +
                    'https://www.clickasnap.com/image/11244287/img-20241018-151220-00-019' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11244289",
                panorama: "photo_11244289",
                type: "360",
                title: "Дворец Пена 2",
                options: {
                  caption: 'Дворец Пена 2',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11244289/img-20241020-115910-00-022"> ' +
                    'https://www.clickasnap.com/image/11244289/img-20241020-115910-00-022' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11244296",
                panorama: "photo_11244296",
                type: "360",
                title: "Дворец Пена 3",
                options: {
                  caption: 'Дворец Пена 3',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11244296/img-20241020-120230-00-023"> ' +
                    'https://www.clickasnap.com/image/11244296/img-20241020-120230-00-023' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11244304",
                panorama: "photo_11244304",
                type: "360",
                title: "Дворец Пена 4",
                options: {
                  caption: 'Дворец Пена 4',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11244304/img-20241020-120634-00-024"> ' +
                    'https://www.clickasnap.com/image/11244304/img-20241020-120634-00-024' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11244334",
                panorama: "photo_11244334",
                type: "360",
                title: "Дворец Пена 5",
                options: {
                  caption: 'Дворец Пена 5',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11244334/img-20241020-120645-00-025"> ' +
                    'https://www.clickasnap.com/image/11244334/img-20241020-120645-00-025' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11244337",
                panorama: "photo_11244337",
                type: "360",
                title: "Дворец Пена 6",
                options: {
                  caption: 'Дворец Пена 6',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11244337/img-20241020-120747-00-026"> ' +
                    'https://www.clickasnap.com/image/11244337/img-20241020-120747-00-026' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11244338",
                panorama: "photo_11244338",
                type: "360",
                title: "Дворец Пена 7",
                options: {
                  caption: 'Дворец Пена 7',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11244338/img-20241020-120910-00-027"> ' +
                    'https://www.clickasnap.com/image/11244338/img-20241020-120910-00-027' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11244340",
                panorama: "photo_11244340",
                type: "360",
                title: "Дворец Пена 8",
                options: {
                  caption: 'Дворец Пена 8',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11244340/img-20241020-121040-00-028"> ' +
                    'https://www.clickasnap.com/image/11244340/img-20241020-121040-00-028' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11244343",
                panorama: "photo_11244343",
                type: "360",
                title: "Дворец Пена 9",
                options: {
                  caption: 'Дворец Пена 9',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11244343/img-20241020-121144-00-029"> ' +
                    'https://www.clickasnap.com/image/11244343/img-20241020-121144-00-029' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11252694",
                panorama: "photo_11252694",
                type: "360",
                title: "Дворец Пена 10",
                options: {
                  caption: 'Дворец Пена 10',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11252694/img-20241020-121302-00-030"> ' +
                    'https://www.clickasnap.com/image/11252694/img-20241020-121302-00-030' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11252727",
                panorama: "photo_11252727",
                type: "360",
                title: "Дворец Пена 11",
                options: {
                  caption: 'Дворец Пена 11',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11252727/img-20241020-122410-00-031"> ' +
                    'https://www.clickasnap.com/image/11252727/img-20241020-122410-00-031' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11252728",
                panorama: "photo_11252728",
                type: "360",
                title: "Дворец Пена 12",
                options: {
                  caption: 'Дворец Пена 12',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11252728/img-20241020-125532-00-032"> ' +
                    'https://www.clickasnap.com/image/11252728/img-20241020-125532-00-032' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11252742",
                panorama: "photo_11252742",
                type: "360",
                title: "Дворец Пена 13",
                options: {
                  caption: 'Дворец Пена 13',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11252742/img-20241020-130522-00-033"> ' +
                    'https://www.clickasnap.com/image/11252742/img-20241020-130522-00-033' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11252764",
                panorama: "photo_11252764",
                type: "360",
                title: "Дворец Пена 14",
                options: {
                  caption: 'Дворец Пена 14',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11252764/img-20241020-131711-00-035"> ' +
                    'https://www.clickasnap.com/image/11252764/img-20241020-131711-00-035' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11252768",
                panorama: "photo_11252768",
                type: "360",
                title: "Дворец Пена 15",
                options: {
                  caption: 'Дворец Пена 15',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11252768/img-20241020-132219-00-039"> ' +
                    'https://www.clickasnap.com/image/11252768/img-20241020-132219-00-039' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11252772",
                panorama: "photo_11252772",
                type: "360",
                title: "Дворец Пена 16",
                options: {
                  caption: 'Дворец Пена 16',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11252772/img-20241020-133837-00-041"> ' +
                    'https://www.clickasnap.com/image/11252772/img-20241020-133837-00-041' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11252773",
                panorama: "photo_11252773",
                type: "360",
                title: "Дворец Пена 17",
                options: {
                  caption: 'Дворец Пена 17',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11252773/img-20241020-133905-00-042"> ' +
                    'https://www.clickasnap.com/image/11252773/img-20241020-133905-00-042' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
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
  //               title: "Place name 1",
  //               options: {
  //                 caption: 'Place name 1',
  //                 description: 'You can look or download original file here ' +
  //                   '<a target="_blank" href="asdfasdfasdf"> ' +
  //                   'asdfasdfasdf' +
  //                   '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
  //               },
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
];
