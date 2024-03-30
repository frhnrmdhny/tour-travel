import { TRPCError } from "@trpc/server";

type ScalarFieldEnum = Record<string, unknown>;

export function validateAttributeFilters<T extends ScalarFieldEnum>(
  filters: Record<string, unknown>| undefined,
  scalarFieldEnum: T
): Record<string, unknown> {
  const where: Record<string, unknown> = {};

  for (const filterKey in filters) {
      const filterValue = filters[filterKey];
      
      if (scalarFieldEnum.hasOwnProperty(filterKey)) {
        (where)[filterKey] = filterValue;
      } else {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: `Filters query with attribute ${filterKey} doesn't exist`,
        });
      }
  }

  return where;
}