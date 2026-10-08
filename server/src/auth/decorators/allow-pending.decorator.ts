import { SetMetadata } from '@nestjs/common';

export const ALLOW_PENDING_KEY = 'allowPendingAccount';
export const AllowPendingAccount = () => SetMetadata(ALLOW_PENDING_KEY, true);
