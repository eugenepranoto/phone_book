export const PAGINATION_VARIABLES = (name: string) : string => {
    return `$limit:Int,$offset:Int,$order_by:[${name}_order_by!],$where:${name}_bool_exp!`;
};