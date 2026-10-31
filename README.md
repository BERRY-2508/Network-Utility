# Berry IT Network Utility

Native Windows PowerShell 5.1 + WPF desktop network diagnostics tool by BERRY IT.

## Features

- Network dashboard: hostname, local/public IPv4, OS, DNS, gateway, adapter
- Continuous ICMP ping graph and CSV export
- Native HTTPS download/upload speed test against Cloudflare endpoints
- Traceroute, DNS lookup, TCP port testing, adapter information, exportable reports
- Official Berry IT company branding

## Running

Review the source before launching. From a standard Windows PowerShell window:

```powershell
irm https://raw.githubusercontent.com/BERRY-2508/Network-Utility/main/NetworkUtility.ps1 | iex
```

The optional shorter `https://network.berry.it.com/win` endpoint requires separate Cloudflare configuration. No elevation is normally required for read-only diagnostics.

## Status

Windows preview build: not fully verified across Windows configurations. Speed tests transfer data over the internet and may consume bandwidth. The app fetches official Berry IT branding from `berry.it.com` on first launch.

Website: https://berry.it.com/
