import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../contexts/ThemeContext";
import { useProfile } from "../../hooks/useProfile";
import { useAuth } from "../../hooks/useAuth";
import {
  COUNTRIES,
  COUNTRIES_BY_GROUP,
  GROUPS,
  INTRO_SECTION,
  HIST_SECTION,
  CC_SECTION,
  getSpecialStickerIds,
  getStickerIds,
  type GroupLetter,
} from "../../lib/constants";
import { useStickers } from "../../hooks/useStickers";
import { AppNav } from "../../components/AppNav";
import { IconCheck, IconChevronRight } from "../../components/icons";
import {
  Avatar,
  CardInfo,
  CompleteBadge,
  Content,
  CountryCard,
  CountryList,
  CountryName,
  FilterBar,
  FilterPill,
  FlagCircle,
  GroupBadge,
  GroupSelect,
  HeaderActions,
  Page,
  ProgressBarFill,
  ProgressBarTrack,
  ProgressBarWrapper,
  ProgressCard,
  ProgressCount,
  ProgressMeta,
  ProgressPct,
  ProgressTitle,
  SectionLabel,
  SpecialColor,
  ThemeDot,
  ThemeToggle,
  CardProgressBarFill,
  CardProgressBarTrack,
} from "./AlbumPage.styles";

type FilterStatus = "all" | "owned" | "missing";

export function AlbumPage() {
  const { themeName, toggleTheme } = useThemeContext();
  const { profile } = useProfile();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { owned, loading, missingCount, totalCount, ownedCount, percentage } =
    useStickers();

  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [filterGroup, setFilterGroup] = useState<GroupLetter | "all">("all");

  const initials = profile?.full_name
    ? profile.full_name
        .split(" ")
        .map((n: string) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  const filteredCountries = useMemo(() => {
    let list =
      filterGroup === "all" ? COUNTRIES : COUNTRIES_BY_GROUP[filterGroup];
    if (filterStatus === "owned") {
      list = list.filter((c) =>
        getStickerIds(c.code, c.totalStickers).some((id) => owned.has(id)),
      );
    } else if (filterStatus === "missing") {
      list = list.filter((c) =>
        getStickerIds(c.code, c.totalStickers).some((id) => !owned.has(id)),
      );
    }
    return list;
  }, [filterGroup, filterStatus, owned]);

  const headerRight = (
    <HeaderActions>
      <ThemeToggle onClick={toggleTheme} title="Trocar tema">
        <ThemeDot $color="#f5c800" $active={themeName === "yellow"} />
        <ThemeDot $color="#009cde" $active={themeName === "blue"} />
      </ThemeToggle>
      <Avatar onClick={signOut} title="Sair">
        {initials}
      </Avatar>
    </HeaderActions>
  );

  return (
    <Page>
      <AppNav title="MyAlbum" headerRight={headerRight} />

      <Content>
        <ProgressCard>
          <ProgressTitle>
            Faltam <span>{missingCount}</span> figurinhas
          </ProgressTitle>
          <ProgressBarWrapper>
            <ProgressBarTrack>
              <ProgressBarFill $pct={percentage} />
            </ProgressBarTrack>
          </ProgressBarWrapper>
          <ProgressMeta>
            <ProgressPct>↑{percentage}%</ProgressPct>
            <ProgressCount>
              {ownedCount}/{totalCount}
            </ProgressCount>
          </ProgressMeta>
        </ProgressCard>

        <FilterBar>
          <FilterPill
            $active={filterStatus === "all"}
            onClick={() => setFilterStatus("all")}
          >
            Todos
          </FilterPill>
          <FilterPill
            $active={filterStatus === "owned"}
            onClick={() => setFilterStatus("owned")}
          >
            Tenho
          </FilterPill>
          <FilterPill
            $active={filterStatus === "missing"}
            onClick={() => setFilterStatus("missing")}
          >
            Faltam
          </FilterPill>
          <GroupSelect
            value={filterGroup}
            onChange={(e) =>
              setFilterGroup(e.target.value as GroupLetter | "all")
            }
          >
            <option value="all">Grupo ▾</option>
            {GROUPS.map((g) => (
              <option key={g} value={g}>
                Grupo {g}
              </option>
            ))}
          </GroupSelect>
        </FilterBar>

        {loading ? (
          <p
            style={{
              color: "rgba(255,255,255,0.3)",
              textAlign: "center",
              padding: "40px 0",
            }}
          >
            Carregando...
          </p>
        ) : (
          <>
            {filterGroup === "all" && filterStatus !== "owned" && (
              <>
                <SectionLabel>✦ Cartas Especiais</SectionLabel>
                <CountryList style={{ marginBottom: 24 }}>
                  {[INTRO_SECTION].map((section, idx) => {
                    const ids = getSpecialStickerIds(section);
                    const sectionOwned = ids.filter((id) =>
                      owned.has(id),
                    ).length;
                    const pct = Math.round((sectionOwned / ids.length) * 100);
                    const allDone = sectionOwned === ids.length;
                    return (
                      <CountryCard
                        key={section.code}
                        $color1={section.colors[0]}
                        $color2={section.colors[1]}
                        style={{ animationDelay: `${idx * 0.03}s` }}
                        onClick={() => navigate(`/album/${section.code}`)}
                      >
                        {allDone && (
                          <CompleteBadge>
                            <IconCheck />
                          </CompleteBadge>
                        )}
                        <SpecialColor $color={section.colors[0]} />
                        <CardInfo>
                          <CountryName>{section.name}</CountryName>
                          <CardProgressBarTrack style={{ marginTop: 6 }}>
                            <CardProgressBarFill
                              $pct={pct}
                              $color={section.colors[0]}
                            />
                          </CardProgressBarTrack>
                        </CardInfo>
                        <ProgressCount style={{ flexShrink: 0 }}>
                          {sectionOwned}/{ids.length}
                        </ProgressCount>
                        <IconChevronRight />
                      </CountryCard>
                    );
                  })}
                </CountryList>
                <SectionLabel>⚽ Seleções</SectionLabel>
              </>
            )}

            <CountryList>
              {filteredCountries.map((country, idx) => {
                const ids = getStickerIds(country.code, country.totalStickers);
                const countryOwned = ids.filter((id) => owned.has(id)).length;
                const pct = Math.round((countryOwned / ids.length) * 100);
                const allDone = countryOwned === ids.length;
                return (
                  <CountryCard
                    key={country.code}
                    $color1={country.colors[0]}
                    $color2={country.colors[1]}
                    style={{ animationDelay: `${idx * 0.03}s` }}
                    onClick={() => navigate(`/album/${country.code}`)}
                  >
                    {allDone && (
                      <CompleteBadge>
                        <IconCheck />
                      </CompleteBadge>
                    )}
                    <FlagCircle>
                      <img
                        src={country.flagUrl}
                        alt={country.name}
                        loading="lazy"
                      />
                    </FlagCircle>
                    <CardInfo>
                      <CountryName>{country.name}</CountryName>
                      <GroupBadge>Grupo {country.group}</GroupBadge>
                      <CardProgressBarTrack style={{ marginTop: 6 }}>
                        <CardProgressBarFill
                          $pct={pct}
                          $color={country.colors[0]}
                        />
                      </CardProgressBarTrack>
                    </CardInfo>
                    <ProgressCount style={{ flexShrink: 0 }}>
                      {countryOwned}/{ids.length}
                    </ProgressCount>
                    <IconChevronRight />
                  </CountryCard>
                );
              })}
            </CountryList>
            <SectionLabel>✦ Cartas Especiais</SectionLabel>
            <CountryList style={{ marginBottom: 24 }}>
              {[HIST_SECTION, CC_SECTION].map((section, idx) => {
                const ids = getSpecialStickerIds(section);
                const sectionOwned = ids.filter((id) => owned.has(id)).length;
                const pct = Math.round((sectionOwned / ids.length) * 100);
                const allDone = sectionOwned === ids.length;
                return (
                  <CountryCard
                    key={section.code}
                    $color1={section.colors[0]}
                    $color2={section.colors[1]}
                    style={{ animationDelay: `${idx * 0.03}s` }}
                    onClick={() => navigate(`/album/${section.code}`)}
                  >
                    {allDone && (
                      <CompleteBadge>
                        <IconCheck />
                      </CompleteBadge>
                    )}
                    <SpecialColor $color={section.colors[0]} />
                    <CardInfo>
                      <CountryName>{section.name}</CountryName>
                      <CardProgressBarTrack style={{ marginTop: 6 }}>
                        <CardProgressBarFill
                          $pct={pct}
                          $color={section.colors[0]}
                        />
                      </CardProgressBarTrack>
                    </CardInfo>
                    <ProgressCount style={{ flexShrink: 0 }}>
                      {sectionOwned}/{ids.length}
                    </ProgressCount>
                    <IconChevronRight />
                  </CountryCard>
                );
              })}
            </CountryList>
          </>
        )}
      </Content>
    </Page>
  );
}
