import { z } from "zod";
export const pointRequetDto = z.object(
    {
        type: z.enum(["ENTRADA", "SAIDA"]

        ),
    }
);

export const pointUpdateRequestDto = pointRequetDto.extend({
    timestamp: z.date().default(() => new Date()),
});

export type PointUpdateRequestDtoType = z.infer<typeof pointUpdateRequestDto>;