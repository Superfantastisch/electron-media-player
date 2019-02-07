export interface IMovie {
    name: string;
    manifestUri: string;
    offlineUri: string;
    imageUrl: string;
}

export const MOVIES = [
    // Shaka assets {{{
    {
        name: 'Angel One',
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd',
        offlineUri: '',
        imageUrl: ''
    },
    {
        name: 'Sintel',
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/sintel/dash.mpd',
        offlineUri: '',
        imageUrl: 'images/Sintel_poster.jpg'
    },
    {
        name: 'Tears of Steel (multicodec, TTML)',
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/tos-ttml/dash.mpd',
        offlineUri: '',
        imageUrl: 'images/Tos-poster.png'
    },
    {
        name: 'Big Buck Bunny',
        manifestUri: 'https://dash.akamaized.net/dash264/TestCases/1c/qualcomm/2/MultiRate.mpd',
        offlineUri: '',
        imageUrl: 'images/Big_buck_bunny_poster_big.jpg'
    },
    {
        name: 'Art of Motion (DASH)',
        manifestUri: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd',
        offlineUri: '',
        imageUrl: ''
    }
];

const imgRights = [
    {
        title: 'Tears of Steel',
        val: 'Von (CC) Blender Foundation | Project Mango - http://mango.blender.org/production/press-release-premiere/, CC BY 3.0, https://commons.wikimedia.org/w/index.php?curid=21604012'
    },
    {
        title: 'Sintel',
        val: 'Von © copyright Blender Foundation – durian.blender.org, CC BY 3.0, https://commons.wikimedia.org/w/index.php?curid=25923511'
    },
    {
        title: 'Big Bug Bunny',
        val: 'Von (c) copyright Blender Foundation | peach.blender.org - [1], CC BY 3.0, https://commons.wikimedia.org/w/index.php?curid=3748497'
    }
];
