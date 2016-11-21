//
//  FOVComponent.swift
//  FOVComponent
//
//  Created by Johan Kasperi on 2016-09-29.
//  Copyright © 2016 Facebook. All rights reserved.
//

import Foundation
import AVFoundation

@objc(FOVComponent)
class FOVComponent: NSObject {
  
  @objc func getFOV(_ resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock){
    let devices = AVCaptureDevice.devices()
    var captureDevice : AVCaptureDevice?
    for device in devices! {
      if ((device as AnyObject).hasMediaType(AVMediaTypeVideo)) {
        if((device as AnyObject).position == AVCaptureDevicePosition.back) {
          captureDevice = device as? AVCaptureDevice
        }
      }
    }
    if let retrievedDevice = captureDevice {
      resolve(retrievedDevice.activeFormat.videoFieldOfView)
    } else {
      reject("", "", NSError(domain:"NO!", code:0, userInfo:nil))
    }
  }
}
