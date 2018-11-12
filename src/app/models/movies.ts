export interface IMovie {
    name: string;
    manifestUri: string;
}

export const MOVIES = [
    // Shaka assets {{{
    {
        name: 'Angel One (multicodec, multilingual)',
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd',
    },
    {
        name: 'Sintel 4k (multicodec)',
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/sintel/dash.mpd',
    },
    {
        name: 'Sintel w/ trick mode (MP4 only, 720p)',
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/sintel-trickplay/dash.mpd',
    },
    {
        name: 'Sintel 4k (WebM only)',
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/sintel-webm-only/dash.mpd',
        // NOTE: hanging in Firefox
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1291451
    },
    {
        name: 'Sintel 4k (MP4 only)',
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/sintel-mp4-only/dash.mpd',
    },
    {
        name: 'Sintel 4k (multicodec, VTT in MP4)',
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/sintel-mp4-wvtt/dash.mpd',
    },
    {
        name: 'Heliocentrism (multicodec, multiperiod)',
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/heliocentrism/heliocentrism.mpd',
    },
    {
        name: 'Heliocentrism (multicodec, multiperiod, xlink)',
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/heliocentrism-xlink/heliocentrism.mpd',
    },
    {
        name: '"Dig the Uke" by Stefan Kartenberg (audio only, multicodec)',
        // From: http://dig.ccmixter.org/files/JeffSpeed68/53327
        // Licensed under Creative Commons BY-NC 3.0.
        // Free for non-commercial use with attribution.
        // http://creativecommons.org/licenses/by-nc/3.0/
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/dig-the-uke-clear/dash.mpd',
    },
    {
        name: '"Dig the Uke" by Stefan Kartenberg (audio only, multicodec, Widevine)',  // eslint-disable-line max-len
        // From: http://dig.ccmixter.org/files/JeffSpeed68/53327
        // Licensed under Creative Commons BY-NC 3.0.
        // Free for non-commercial use with attribution.
        // http://creativecommons.org/licenses/by-nc/3.0/
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/dig-the-uke/dash.mpd',
    },
    {
        name: 'Tears of Steel (multicodec, TTML)',
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/tos-ttml/dash.mpd',
    },
    {
        name: 'Tears of Steel (multicodec, surround + stereo)',
        manifestUri: 'https://storage.googleapis.com/shaka-demo-assets/tos-surround/dash.mpd',
    },
    {
        name: 'Shaka Player History (multicodec, live, DASH)',
        manifestUri: 'https://storage.googleapis.com/shaka-live-assets/player-source.mpd',
    },
    // }}}
    {
        name: 'Clear, single-Period',
        manifestUri: 'https://media.axprod.net/TestVectors/v7-Clear/Manifest.mpd',
    },
    {
        name: 'Clear, multi-Period',
        manifestUri: 'https://media.axprod.net/TestVectors/v7-Clear/Manifest_MultiPeriod.mpd',
    },
    {
        name: 'Clear, Live DASH',
        manifestUri: 'https://akamai-axtest.akamaized.net/routes/lapd-v1-acceptance/www_c4/Manifest.mpd',
    },
 
    // }}}

    // Unified Streaming {{{
    // Src: http://demo.unified-streaming.com/features.html
    {
        name: 'Tears of Steel',
        manifestUri: 'https://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel.ism/.mpd',
    },
    {
        name: 'Tears of Steel (subtitles)',
        manifestUri: 'https://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel-en.ism/.mpd',
    },
    // }}}

    // DASH-IF assets {{{
    // Src: http://dashif.org/test-vectors/
    {
        name: 'Big Buck Bunny',
        manifestUri: 'https://dash.akamaized.net/dash264/TestCases/1c/qualcomm/2/MultiRate.mpd',
    },
    {
        name: 'Live sim (2s segments)',
        manifestUri: 'https://vm2.dashif.org/livesim/utc_head/testpic_2s/Manifest.mpd',
    },
    {
        name: 'Live sim (6s segments)',
        manifestUri: 'https://vm2.dashif.org/livesim/utc_head/testpic_6s/Manifest.mpd',
    },
    {
        name: 'Live sim (multi-period)',
        manifestUri: 'https://vm2.dashif.org/livesim/utc_head/periods_20/testpic_2s/Manifest.mpd',
    },
    // }}}

    // Wowza assets {{{
    // Src: http://www.dash-player.com/demo/streaming-server-and-encoder-support/
    {
        name: 'Big Buck Bunny (Live)',
        manifestUri: 'https://wowzaec2demo.streamlock.net/live/bigbuckbunny/manifest_mpm4sav_mvtime.mpd',
    },
    // }}}

    // bitcodin assets {{{
    // Src: http://www.dash-player.com/demo/streaming-server-and-encoder-support/
    // Src: https://bitmovin.com/mpeg-dash-hls-examples-sample-streams/
    {
        name: 'Art of Motion (DASH)',
        manifestUri: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd',
    },

    // GPAC assets {{{
    // Src: https://gpac.wp.mines-telecom.fr/2012/02/23/dash-sequences/
    // NOTE: The assets here using the "live profile" are not actually
    // "live streams".  The content is still static, as is the timeline.
    {
        name: 'live profile',
        manifestUri: 'https://download.tsi.telecom-paristech.fr/gpac/DASH_CONFORMANCE/TelecomParisTech/mp4-live/mp4-live-mpd-AV-BS.mpd',
        // NOTE: Multiple SPS/PPS in init segment, no sample duration
        // NOTE: Decoder errors on Mac
        // https://github.com/gpac/gpac/issues/600
        // https://bugs.webkit.org/show_bug.cgi?id=160459
    },
    {
        name: 'live profile with five periods',
        manifestUri: 'https://download.tsi.telecom-paristech.fr/gpac/DASH_CONFORMANCE/TelecomParisTech/mp4-live-periods/mp4-live-periods-mpd.mpd',
    },
    {
        name: 'main profile, single file',
        manifestUri: 'https://download.tsi.telecom-paristech.fr/gpac/DASH_CONFORMANCE/TelecomParisTech/mp4-main-single/mp4-main-single-mpd-AV-NBS.mpd',
    },
    {
        name: 'onDemand profile',
        manifestUri: 'https://download.tsi.telecom-paristech.fr/gpac/DASH_CONFORMANCE/TelecomParisTech/mp4-onDemand/mp4-onDemand-mpd-AV.mpd',
    },
];
