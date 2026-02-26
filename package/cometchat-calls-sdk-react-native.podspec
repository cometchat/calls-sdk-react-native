require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = 'cometchat-calls-sdk-react-native'
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]
  s.platforms    = { :ios => '13.0' }
  s.source       = { :git => 'https://github.com/cometchat/calls-sdk-react-native.git', :tag => s.version }

  s.source_files = 'ios/**/*.{h,m}'

  s.dependency 'React-Core'
  s.dependency 'react-native-webrtc'
  s.frameworks   = 'AVFoundation', 'UIKit'
end
