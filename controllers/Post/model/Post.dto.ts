import {IsNumber, IsString} from "class-validator"
class CreatePostDto{
    @IsNumber()
    public postId : string ;
    
    @IsString()
    public content : string ;
    
    @IsString()
    public title : string ;
}

export default CreatePostDto;