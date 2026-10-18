// Xcode 27 rejects pod targets (including resource bundles) whose deployment
// target is below iOS 15. Several pods still declare 12.x/13.x, so raise them.
const { withDangerousMod } = require('expo/config-plugins');
const fs = require('fs');
const path = require('path');

const MARKER = '# with-pods-deployment-target';

module.exports = function withPodsDeploymentTarget(config, { minimum = '15.1' } = {}) {
  return withDangerousMod(config, [
    'ios',
    (cfg) => {
      const podfile = path.join(cfg.modRequest.platformProjectRoot, 'Podfile');
      let contents = fs.readFileSync(podfile, 'utf8');
      if (contents.includes(MARKER)) return cfg;

      const snippet = `
    ${MARKER}
    installer.pods_project.targets.each do |t|
      t.build_configurations.each do |c|
        current = c.build_settings['IPHONEOS_DEPLOYMENT_TARGET']
        if current.nil? || Gem::Version.new(current) < Gem::Version.new('${minimum}')
          c.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '${minimum}'
        end
      end
    end
`;
      contents = contents.replace(/(post_install do \|installer\|\n)/, `$1${snippet}`);
      fs.writeFileSync(podfile, contents);
      return cfg;
    },
  ]);
};
