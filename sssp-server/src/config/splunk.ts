

export default {
    maxTotalDataSizeMB: process.env.MAX_TOTAL_DATA_SIZE_MB || 100000000,
    frozenTimePeriodInSecs: process.env.FROZEN_TIME_PERION_IN_SECONDS || 7776000
}