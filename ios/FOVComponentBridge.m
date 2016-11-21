//
//  FOVComponentBridge.m
//  FOVComponent
//
//  Created by Johan Kasperi on 2016-09-29.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

// FOVComponentBridge.m

#import "RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(FOVComponent, NSObject)

RCT_EXTERN_METHOD(getFOV:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)

@end
