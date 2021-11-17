import * as yup from 'yup';
import axios from 'axios';
import ROUTES from '../config/routes';

export interface CourseResults {
  campus: string;
  code: string;
  course_description: string;
  department: string;
  division: string;
  id: number;
  name: string;
  term: string;
}

interface Response {
  query: string;
  results: CourseResults[];
}

interface Filters {
  year: string;
  division: string;
  department: string;
  campus: string;
}

const schema: yup.SchemaOf<Response> = yup
  .object()
  .shape({
    query: yup.string(),
    success: yup.boolean(),
    results: yup.array().of(
      yup.object({
        campus: yup.string().defined(),
        code: yup.string().defined(),
        course_description: yup.string().defined(),
        department: yup.string().defined(),
        division: yup.string().defined(),
        id: yup.string().defined(),
        name: yup.string().defined(),
        term: yup.string().defined(),
      })
    ),
  })
  .defined();

async function SearchQuery(
  query: string,
  filters: Filters | string
): Promise<Response | null> {
  let res: Response | null = null;

  const request_param = { query: query, filters: filters };
  await axios
    .post(ROUTES.backend + ROUTES.search, request_param)
    .then((response) => {
      schema.validate(response.data).catch(() => {
        return;
      });
      res = response.data;
    })
    .catch(() => {
      return;
    });
  return res;
}

export default SearchQuery;
