import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps :true
})

export class User{
    @Prop({type:String})
    name : string | undefined | unknown;

    @Prop({type:String})
    email : string | undefined | unknown ;

    @Prop({type:String})
    number : string | undefined | unknown  ;
}

export const UserSchema = SchemaFactory.createForClass(User)
