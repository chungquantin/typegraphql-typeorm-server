import { GraphQLError } from "graphql";
import { MiddlewareFn } from "type-graphql";
import { ObjectSchema } from "yup";
import { GQLContext } from "../../utils/graphql-utils";

export const yupValidateMiddleware = (
	validationSchema: ObjectSchema<any>
): MiddlewareFn<GQLContext> => async ({ args }, next) => {
	console.log(JSON.stringify(args, null, 2));
	await validationSchema
		.validate(
			{
				...args.data,
			},
			{ abortEarly: false }
		)
		.catch((err) => {
			throw new GraphQLError(err);
		});

	return next();
};
