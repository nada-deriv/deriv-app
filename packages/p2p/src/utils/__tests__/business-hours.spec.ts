import { splitTimeRange } from 'Utils/business-hours';

describe('splitTimeRange', () => {
    it('should split time range correctly', () => {
        let time_range = [{ start_min: 0, end_min: 10080 }];
        expect(splitTimeRange(time_range, 0)).toEqual([
            { start_min: 0, end_min: 1440 },
            { start_min: 1440, end_min: 2880 },
            { start_min: 2880, end_min: 4320 },
            { start_min: 4320, end_min: 5760 },
            { start_min: 5760, end_min: 7200 },
            { start_min: 7200, end_min: 8640 },
            { start_min: 8640, end_min: 10080 },
        ]);

        time_range = [
            { start_min: 0, end_min: 1440 },
            { start_min: 2880, end_min: 10080 },
        ];

        expect(splitTimeRange(time_range, 0)).toEqual([
            { start_min: 0, end_min: 1440 },
            { start_min: null, end_min: null },
            { start_min: 2880, end_min: 4320 },
            { start_min: 4320, end_min: 5760 },
            { start_min: 5760, end_min: 7200 },
            { start_min: 7200, end_min: 8640 },
            { start_min: 8640, end_min: 10080 },
        ]);

        //offset gmt + 10
        time_range = [
            { start_min: 10020, end_min: 10080 },
            { start_min: 0, end_min: 420 },
            { start_min: 1380, end_min: 1860 },
            { start_min: 2820, end_min: 3300 },
            { start_min: 4260, end_min: 4740 },
            { start_min: 5700, end_min: 6180 },
            { start_min: 7140, end_min: 7620 },
            { start_min: 8580, end_min: 9060 },
        ];
        expect(splitTimeRange(time_range, -600)).toEqual([
            {
                start_min: 540,
                end_min: 1020,
            },
            {
                start_min: 1980,
                end_min: 2460,
            },
            {
                start_min: 3420,
                end_min: 3900,
            },
            {
                start_min: 4860,
                end_min: 5340,
            },
            {
                start_min: 6300,
                end_min: 6780,
            },
            {
                start_min: 7740,
                end_min: 8220,
            },
            {
                start_min: 9180,
                end_min: 9660,
            },
        ]);

        //gmt + 5.30
        time_range = [
            { start_min: 210, end_min: 690 },
            { start_min: 1650, end_min: 2130 },
            { start_min: 3090, end_min: 3570 },
            { start_min: 4530, end_min: 5010 },
            { start_min: 5970, end_min: 6450 },
            { start_min: 7410, end_min: 7890 },
            { start_min: 8850, end_min: 9330 },
        ];
        expect(splitTimeRange(time_range, -330)).toEqual([
            { start_min: 540, end_min: 1020 },
            { start_min: 1980, end_min: 2460 },
            { start_min: 3420, end_min: 3900 },
            { start_min: 4860, end_min: 5340 },
            { start_min: 6300, end_min: 6780 },
            { start_min: 7740, end_min: 8220 },
            { start_min: 9180, end_min: 9660 },
        ]);

        //gmt - 11
        time_range = [
            { start_min: 1200, end_min: 1680 },
            { start_min: 2640, end_min: 3120 },
            { start_min: 4080, end_min: 4560 },
            { start_min: 5520, end_min: 6000 },
            { start_min: 6960, end_min: 7440 },
            { start_min: 8400, end_min: 8880 },
            { start_min: 9840, end_min: 10080 },
            { start_min: 0, end_min: 240 },
        ];
        expect(splitTimeRange(time_range, 660)).toEqual([
            { start_min: 540, end_min: 1020 },
            { start_min: 1980, end_min: 2460 },
            { start_min: 3420, end_min: 3900 },
            { start_min: 4860, end_min: 5340 },
            { start_min: 6300, end_min: 6780 },
            { start_min: 7740, end_min: 8220 },
            { start_min: 9180, end_min: 9660 },
        ]);
    });
});
