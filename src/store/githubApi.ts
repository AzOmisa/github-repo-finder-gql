import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Repository {
	id: string;
	name: string;
	description: string;
	url: string;
	stargazerCount: number;
	forkCount: number;
	updatedAt: string;
	primaryLanguage: {
		name: string;
		color: string;
	} | null;
	licenseInfo: {
		name: string;
		spdxId: string;
	} | null;
	owner: {
		login: string;
		avatarUrl: string;
	};
}

export interface SearchResponse {
	search: {
		repositoryCount: number;
		pageInfo: {
			hasNextPage: boolean;
			hasPreviousPage: boolean;
			startCursor: string | null;
			endCursor: string | null;
		};
		nodes: Array<Repository>
	};
}

export type SortField = 'STARS' | 'FORKS' | 'UPDATED';
export type SortDirection = 'ASC' | 'DESC';
const bearer = process.env.NEXT_PUBLIC_GITHUB_BEARER_TOKEN;


export const githubApi = createApi({
	reducerPath: 'githubApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.github.com/graphql',
		prepareHeaders: (headers) => {
			headers.set('Authorization', `Bearer ${bearer}`);
			headers.set('Content-Type', 'application/json');
			return headers;
		},
	}),
	endpoints: (builder) => ({
		searchRepositories: builder.query<
			{data: SearchResponse},
			{
				query: string;
				first?: number;
				after?: string;
				sortField?: SortField;
				sortDirection?: SortDirection;
			}
		>({
			query: ({ query, first = 10, after, sortField = 'STARS', sortDirection = 'DESC' }) => {
        const sortMap = {
					STARS: 'sort:stars',
					FORKS: 'sort:forks',
					UPDATED: 'sort:updated',
				};
				const direction = sortDirection === 'ASC' ? 'ASC' : 'DESC';
				const searchQuery = `${query} in:name ${sortMap[sortField]}-${direction}`;

				return {
					url: '',
					method: 'POST',
					body: {
						query: `
              query SearchRepositories($searchQuery: String!, $first: Int!, $after: String) {
                search(query: $searchQuery, type: REPOSITORY, first: $first, after: $after) {
                  repositoryCount
									pageInfo {
						        hasNextPage
						        hasPreviousPage
						        startCursor
						        endCursor
						      }
                  nodes {
                    ... on Repository {
					            id
					            name
					            description
					            url
					            stargazerCount
					            forkCount
					            updatedAt
					            primaryLanguage {
					              name
					              color
					            }
					            licenseInfo {
					              name
					              spdxId
					            }
					            owner {
					              login
					              avatarUrl
					            }
					          }
                  }
                }
              }
            `,
						variables: { searchQuery, first, after },
					},
				};
			},
		}),
		detectSchema: builder.query({
			query: () => ({
				url: '',
				method: 'POST',
				body: {
					query: `
					  __type(name: "Repository") {
					    name
					    kind
					    description
					    fields {
					      name
					    }
					  }
					`,
				},
			}),
		}),
	}),
});

export const { useSearchRepositoriesQuery, useDetectSchemaQuery } = githubApi;
