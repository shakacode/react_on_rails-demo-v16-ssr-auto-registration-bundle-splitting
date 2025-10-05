# frozen_string_literal: true

# React on Rails Pro configuration
# See https://www.shakacode.com/react-on-rails-pro/docs/configuration/

ReactOnRailsPro.configure do |config|
  # Enable React Server Components support
  config.enable_rsc_support = true

  # Use Node renderer for streaming RSC
  config.server_renderer = "NodeRenderer"

  # Node renderer URL (uses localhost:3800 by default if not set)
  config.renderer_url = ENV.fetch("REACT_RENDERER_URL", "http://localhost:3800")

  # Password for node renderer (should match client/node-renderer.js)
  config.renderer_password = ENV.fetch("RENDERER_PASSWORD", "devPassword")
end
