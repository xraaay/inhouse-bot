const urls = [
    "https://www.youtube.com/watch?v=VDpoyXZmKJM",
    "https://www.youtube.com/watch?v=TW7j-gDytX8",
    "https://www.youtube.com/watch?v=r_mLkNZwFJk",
    "https://www.youtube.com/watch?v=--hsVknT1c0",
    "https://www.youtube.com/watch?v=RuJNUXT2a9U",
    "https://www.youtube.com/watch?v=kgMNaQ9U798",
    "https://www.youtube.com/watch?v=mc2_zYDuHC4",
    "https://www.youtube.com/watch?v=MdN0NXgjsn8",
    "https://www.youtube.com/watch?v=POCdbcPxNfc",
    "https://www.youtube.com/watch?v=_R9c_tK8yNA",
    "https://www.youtube.com/watch?v=YZ6K3m9TsPs",
    "https://www.youtube.com/watch?v=MH40LuAmHok",
    "https://www.youtube.com/watch?v=XrOInua-c18",
    "https://www.youtube.com/watch?v=1X4v3WmpNo8",
    "https://www.youtube.com/watch?v=rAlTOfl9F2w",
    "https://www.youtube.com/watch?v=Za2PJnCAkUA",
    "https://www.youtube.com/watch?v=ZNWyhl-I_ak",
    "https://www.youtube.com/watch?v=t5n5KlXv0Vo",
    "https://www.youtube.com/watch?v=X4EWMFpXQYA",
    "https://www.youtube.com/watch?v=R7BiKZbKffk",
    "https://www.youtube.com/watch?v=egLJDoOsqUg",
    "https://www.youtube.com/watch?v=SuDqNLgVHv8",
    "https://www.youtube.com/watch?v=l7gD2KtepSM",
    "https://www.youtube.com/watch?v=vAweH8Kh-VQ",
    "https://www.youtube.com/watch?v=ts5zCR0O2LU",
    "https://www.youtube.com/watch?v=wiPzgDEpNxs",
    "https://www.youtube.com/watch?v=71GWS3ccmvI",
    "https://www.youtube.com/watch?v=REdFdm2I2CQ",
    "https://www.youtube.com/watch?v=SL1VZaJfbBM",
    "https://www.youtube.com/watch?v=-pb6CV8exO4",
    "https://www.youtube.com/watch?v=tTi7oOPaB4Y",
    "https://www.youtube.com/watch?v=QC5iq6HYQ1g",
    "https://www.youtube.com/watch?v=ddDcftzYJD4",
    "https://www.youtube.com/watch?v=xy96nY4zEv8",
    "https://www.youtube.com/watch?v=-N0yXGVWS1Y",
    "https://www.youtube.com/watch?v=d1Z8Hz7M04A",
    "https://www.youtube.com/watch?v=B-ao2KBU5JI",
    "https://www.youtube.com/watch?v=vMau8kqe-oM",
    "https://www.youtube.com/watch?v=0A67YpUs6sQ",
    "https://www.youtube.com/watch?v=p-DpGvDGXWA",
    "https://www.youtube.com/watch?v=x6tTLjjIGp0",
    "https://www.youtube.com/watch?v=mGzzIQEWdK4",
    "https://www.youtube.com/watch?v=TeOYBarKG24",
    "https://www.youtube.com/watch?v=alEnUM7yj54",
    "https://www.youtube.com/watch?v=V1j2Ra-sGt0",
    "https://www.youtube.com/watch?v=RE16UK2o1Yk",
    "https://www.youtube.com/watch?v=a9JGzBdfkp0",
    "https://www.youtube.com/watch?v=0GX0v1Ryj68",
    "https://www.youtube.com/watch?v=BAd4ZgLnb0A",
    "https://www.youtube.com/watch?v=LnapbyNo8co",
    "https://www.youtube.com/watch?v=lW3I7yz5nVo",
    "https://www.youtube.com/watch?v=YR8-K7ocZbo",
    "https://www.youtube.com/watch?v=ADZ2YABEF-A",
    "https://www.youtube.com/watch?v=mLmIGQHwFYw",
    "https://www.youtube.com/watch?v=JKbtznMX0wY",
    "https://www.youtube.com/watch?v=V6bdc7vXx1k",
    "https://www.youtube.com/watch?v=B7f3JMpSSTY",
    "https://www.youtube.com/watch?v=m82_eeUl8AA",
    "https://www.youtube.com/watch?v=7F0JcVVFSvU",
    "https://www.youtube.com/watch?v=QUFI11VZIuU",
    "https://www.youtube.com/watch?v=lYMfIwZ3syc",
    "https://www.youtube.com/watch?v=CqEZ4lrn8J4",
    "https://www.youtube.com/watch?v=xdl02gCwpu0",
    "https://www.youtube.com/watch?v=YSfleHFmUg0",
    "https://www.youtube.com/watch?v=XEcsohMKOe0",
    "https://www.youtube.com/watch?v=qWFBNSt0DFs",
    "https://www.youtube.com/watch?v=tCd4F5zWNHY",
    "https://www.youtube.com/watch?v=6u8f6pE69k0",
    "https://www.youtube.com/watch?v=7MgOsNM-V4o",
    "https://www.youtube.com/watch?v=xLRqxWRRUWY",
    "https://www.youtube.com/watch?v=VsJc2ZhbXIg",
    "https://www.youtube.com/watch?v=4e6ZFO66A_A",
    "https://www.youtube.com/watch?v=Ae-WUJGYpyc",
    "https://www.youtube.com/watch?v=MZdOMlWAKTs",
    "https://www.youtube.com/watch?v=hXCrvEovy74",
    "https://www.youtube.com/watch?v=aLzgTd4YDyY",
    "https://www.youtube.com/watch?v=tuZhab2zG08",
    "https://www.youtube.com/watch?v=yICai9wwRl4",
    "https://www.youtube.com/watch?v=VWqpIkSQNlg",
    "https://www.youtube.com/watch?v=FQguoE7LwBQ",
    "https://www.youtube.com/watch?v=Oc4-__zRuOc",
    "https://www.youtube.com/watch?v=tYr66VH9KvY",
    "https://www.youtube.com/watch?v=DttwLwqYaZQ",
    "https://www.youtube.com/watch?v=agz-Eg-MRAw",
    "https://www.youtube.com/watch?v=WaGe3MxN55Y",
    "https://www.youtube.com/watch?v=3e4HWnrWmFc",
    "https://www.youtube.com/watch?v=c9BoyyaSjPY",
    "https://www.youtube.com/watch?v=zJkcjp1AjUI",
    "https://www.youtube.com/watch?v=Qxjirh4M1f8",
    "https://www.youtube.com/watch?v=G3cdQM2TeMA",
    "https://www.youtube.com/watch?v=Gd25a0ADw44",
    "https://www.youtube.com/watch?v=6XUOo-2gSu4",
    "https://www.youtube.com/watch?v=AJPMPXO4XFo",
    "https://www.youtube.com/watch?v=1d5WJrBvCVk",
    "https://www.youtube.com/watch?v=hyjr8Pl2KRk",
    "https://www.youtube.com/watch?v=W6D6Je6bH_8",
    "https://www.youtube.com/watch?v=MiqO6Sx2urQ",
    "https://www.youtube.com/watch?v=6nPAkYDJlg4",
    "https://www.youtube.com/watch?v=yVFt0szaX_8",
    "https://www.youtube.com/watch?v=yTOwMeimSl4",
    "https://www.youtube.com/watch?v=oTl2JpjWwD4",
    "https://www.youtube.com/watch?v=FhUQlFOK3Z4",
    "https://www.youtube.com/watch?v=tZQJhvs4amQ",
    "https://www.youtube.com/watch?v=0OMCy52KLAE",
    "https://www.youtube.com/watch?v=0j0erS3PsYQ",
    "https://www.youtube.com/watch?v=ubLBTZw5AZw",
    "https://www.youtube.com/watch?v=Z-hnyAHi2qw",
    "https://www.youtube.com/watch?v=WEdox8cp094",
    "https://www.youtube.com/watch?v=PEW7rDWcww4",
    "https://www.youtube.com/watch?v=4e-Z4qxpdfo",
    "https://www.youtube.com/watch?v=9lYALH3AU44",
    "https://www.youtube.com/watch?v=Z9wcCUZqXyQ",
    "https://www.youtube.com/watch?v=w8DU5BWyjTg",
    "https://www.youtube.com/watch?v=iS1T8-yn6WE",
    "https://www.youtube.com/watch?v=gQeRN7McqsY",
    "https://www.youtube.com/watch?v=oGvHdfpYrLM",
    "https://www.youtube.com/watch?v=_90-zNuPHog",
    "https://www.youtube.com/watch?v=jAzU8lGPPdE",
    "https://www.youtube.com/watch?v=gTrHlzPr1Bk",
    "https://www.youtube.com/watch?v=Mp_gKwugwi8",
    "https://www.youtube.com/watch?v=mr-Bl9Q5U10",
    "https://www.youtube.com/watch?v=Wqc5-IggOh4",
    "https://www.youtube.com/watch?v=7H04TrRfuQ8",
    "https://www.youtube.com/watch?v=kGbfHDZwmdY",
    "https://www.youtube.com/watch?v=t5n5KlXv0Vo",
    "https://www.youtube.com/watch?v=DHF8XQVhbNI",
    // "https://www.youtube.com/watch?v=WQ2D_fqxln0",
    "https://www.youtube.com/watch?v=cyYy2eQLjGs",
    "https://www.youtube.com/watch?v=GnM41HyBljY",
    "https://www.youtube.com/watch?v=h8VAxIkykwg",
    "https://www.youtube.com/watch?v=JUwYZUFzs7g",
    "https://www.youtube.com/watch?v=ZNWyhl-I_ak",
    "https://www.youtube.com/watch?v=06Eg9IEkc5U",
    "https://www.youtube.com/watch?v=s268hwU8sNQ",
    "https://www.youtube.com/watch?v=SV69Q7w8YM8",
    "https://www.youtube.com/watch?v=1ESmPTWKM8s",
    "https://www.youtube.com/watch?v=mAfL3RmddwU",
    "https://www.youtube.com/watch?v=63hAoGXVjg0",
    "https://www.youtube.com/watch?v=XUHFRco4Bgo",
    "https://www.youtube.com/watch?v=IFHy1BXIvCM",
    "https://www.youtube.com/watch?v=39CvapFosVE",
    "https://www.youtube.com/watch?v=3OpW8Tj2zNA",
    "https://www.youtube.com/watch?v=6ZedzVNd064",
    "https://www.youtube.com/watch?v=VpRc4fXFC3Y",
    "https://www.youtube.com/watch?v=M5096JrfkRs",
    "https://www.youtube.com/watch?v=DSfEDtOf1d0",
    "https://www.youtube.com/watch?v=P83PsNnMSzI",
    "https://www.youtube.com/watch?v=HOGwrlfSuyk",
    "https://www.youtube.com/watch?v=HfY89h3z8BY",
    "https://www.youtube.com/watch?v=aZj9Ub2vr-Q",
    "https://www.youtube.com/watch?v=wPHmIB1wPvI",
    "https://www.youtube.com/watch?v=rnjyMl7Vlw0",
    "https://www.youtube.com/watch?v=mdrbqR8g8n0",
    "https://www.youtube.com/watch?v=_DyosdwcnMs",
    "https://www.youtube.com/watch?v=KreO8ErugCk",
    "https://www.youtube.com/watch?v=cTCMYcI7OSI",
    "https://www.youtube.com/watch?v=UFsNKktkvCI",
    "https://www.youtube.com/watch?v=Lu5SJcNp0J0",
    "https://www.youtube.com/watch?v=VoW9czgQBqE",
    "https://www.youtube.com/watch?v=fYpYlbX8MhY",
    "https://www.youtube.com/watch?v=FAWREVTuwnw",
    "https://www.youtube.com/watch?v=YSzOXtXm8p0",
    "https://www.youtube.com/watch?v=ZvkjewgF8GQ",
    "https://www.youtube.com/watch?v=nYBkygm-vrA",
    "https://www.youtube.com/watch?v=ikmRFcUyfMk",
    "https://www.youtube.com/watch?v=xs1LozmWOGQ",
    "https://www.youtube.com/watch?v=NaSd2d5rwPE",
    "https://www.youtube.com/watch?v=Q6ctb-Pb3lc",
    "https://www.youtube.com/watch?v=Bbh4ynlXlY0",
    "https://www.youtube.com/watch?v=4Zml9Thknxw",
    "https://www.youtube.com/watch?v=IJcxjA9KcS4",
    "https://www.youtube.com/watch?v=Iyn-0af_hlI",
    "https://www.youtube.com/watch?v=yzyI2Lq28AQ",
    "https://www.youtube.com/watch?v=esz3mlMz1Os",
    "https://www.youtube.com/watch?v=oTRZOYTev4g",
    "https://www.youtube.com/watch?v=jE--tfdZ3-8",
    "https://www.youtube.com/watch?v=O-YX6pMLMfA",
    "https://www.youtube.com/watch?v=iTyVTDkgJ58",
    "https://www.youtube.com/watch?v=LPmzRa-sXQs",
    "https://www.youtube.com/watch?v=drI8C194-mw",
    "https://www.youtube.com/watch?v=0uCr9eC6e8M",
    "https://www.youtube.com/watch?v=a89ChTdUFrc",
    "https://www.youtube.com/watch?v=pwJmVpp8fng",
    "https://www.youtube.com/watch?v=mzx4XCmfvhU",
    "https://www.youtube.com/watch?v=XOgy-RKEZsQ",
    "https://www.youtube.com/watch?v=ecz_mfugqLs",
    "https://www.youtube.com/watch?v=gkuMxge22FQ",
    "https://www.youtube.com/watch?v=ib-pbqQ_xps",
    "https://www.youtube.com/watch?v=6SxjBWJPf78",
]

module.exports = {
    urls
}