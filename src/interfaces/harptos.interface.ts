
export interface HarptosCalendarHttp {
    // What is expected on a Post request
    _campaign_id: string,
    currentDay: number,
    harptosYear: number,
    days: HarptosDay[]

}

export interface HarptosCalendar extends HarptosCalendarHttp {
    // What would come back from a get request
    // What is prepared for a DB write
    _id?: string,
    _user_id: string
}

export interface HarptosDay {
    month: string,
    dayNumber: number,
    season: string
}

/* Used by Logic Layer */
export interface HarptosUpdate {
    campaign_id?: string,
    currentDay?: number,
    harptosYear?: number,
    days?: HarptosDay[]
}