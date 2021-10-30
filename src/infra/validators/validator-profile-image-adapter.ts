import validator from 'validator';

import { ProfileImageValidator } from '@/presentation/validation/protocols';

export class ValidatorProfileImageAdapter implements ProfileImageValidator {
  validate(image: ProfileImageValidator.Params): ProfileImageValidator.Result {
    if (!image) return true;

    const hasValidMimetype = validator.isMimeType(image.mimetype);

    if (!hasValidMimetype) return false;

    const validTypesOfImage = ['jpeg', 'png', 'jpg'];
    const imageType = image.mimetype.replace('image/', '');

    if (!validTypesOfImage.includes(imageType)) return false;

    return true;
  }
}
